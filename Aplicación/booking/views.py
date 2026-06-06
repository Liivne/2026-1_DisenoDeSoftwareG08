from django.contrib import messages
from django.http import HttpRequest, HttpResponse
from django.shortcuts import redirect, render

from .forms import LoginForm, RegisterForm, ScheduleForm
from .mock_data import create_reservation, get_campaigns, get_points, get_slots, get_vaccines, is_available


MOCK_USERS = {
    "demo@vacunacion.cl": {
        "full_name": "Usuario Demo",
        "identifier": "11.111.111-1",
        "password": "Demo1234",
    }
}


def _current_user(request: HttpRequest):
    return request.session.get("user")


def home(request: HttpRequest) -> HttpResponse:
    return render(request, "booking/home.html")


def login_view(request: HttpRequest) -> HttpResponse:
    form = LoginForm(request.POST or None)
    if request.method == "POST" and form.is_valid():
        email = form.cleaned_data["email"].lower()
        password = form.cleaned_data["password"]
        print("[Sistema] Validando campos de login...")
        print(f"[DB] Buscando usuario {email} y validando credenciales...")
        user = MOCK_USERS.get(email)
        if user and user["password"] == password:
            request.session["user"] = {"full_name": user["full_name"], "email": email}
            print("[Sistema] Credenciales válidas. Generando token de acceso y redirigiendo al menú principal...")
            messages.success(request, "Sesión iniciada correctamente.")
            return redirect("dashboard")
        print("[Sistema] Credenciales inválidas.")
        messages.error(request, "Credenciales inválidas. Intenta nuevamente.")
    return render(request, "booking/login.html", {"form": form})


def register_view(request: HttpRequest) -> HttpResponse:
    form = RegisterForm(request.POST or None)
    if request.method == "POST" and form.is_valid():
        print("[Sistema] Validando formato y obligatoriedad del registro...")
        email = form.cleaned_data["email"].lower()
        MOCK_USERS[email] = {
            "full_name": form.cleaned_data["full_name"],
            "identifier": form.cleaned_data["identifier"],
            "password": form.cleaned_data["password"],
        }
        print("[DB] Almacenando información del usuario...")
        request.session["user"] = {"full_name": form.cleaned_data["full_name"], "email": email}
        print("[Sistema] Cuenta creada exitosamente. Generando token de acceso...")
        messages.success(request, "Cuenta creada exitosamente.")
        return redirect("dashboard")
    return render(request, "booking/register.html", {"form": form})


def dashboard(request: HttpRequest) -> HttpResponse:
    user = _current_user(request)
    if not user:
        return redirect("home")

    print("[Sistema] Solicitando información disponible para la pantalla principal...")
    campaigns = get_campaigns()
    campaign_id = request.GET.get("campaign", campaigns[0]["id"])
    vaccines = get_vaccines(campaign_id)
    points = get_points(campaign_id)
    slots = get_slots(campaign_id, vaccines[0] if vaccines else None, points[0] if points else None)
    return render(request, "booking/dashboard.html", {"user": user, "campaigns": campaigns, "vaccines": vaccines, "points": points, "slots": slots, "selected_campaign": campaign_id})


def campaigns_view(request: HttpRequest) -> HttpResponse:
    user = _current_user(request)
    if not user:
        return redirect("home")
    campaigns = get_campaigns()
    return render(request, "booking/campaigns.html", {"user": user, "campaigns": campaigns})


def schedule_view(request: HttpRequest) -> HttpResponse:
    user = _current_user(request)
    if not user:
        return redirect("home")

    selected_campaign = request.POST.get("campaign") or request.GET.get("campaign") or "influenza"
    selected_vaccine = request.POST.get("vaccine") or request.GET.get("vaccine")
    selected_point = request.POST.get("point") or request.GET.get("point")
    form = ScheduleForm(request.POST or None, campaign_id=selected_campaign, vaccine=selected_vaccine, point=selected_point)

    if request.method == "POST" and form.is_valid():
        campaign_id = form.cleaned_data["campaign"]
        vaccine = form.cleaned_data["vaccine"]
        point = form.cleaned_data["point"]
        slot = form.cleaned_data["slot"]
        print("[Sistema] Validando existencia de disponibilidad para la combinación seleccionada...")
        if is_available(campaign_id, vaccine, point, slot):
            print("[Sistema] Cupos disponibles. Registrando la cita y generando comprobante...")
            reservation = create_reservation(user["full_name"], campaign_id, vaccine, point, slot)
            request.session["reservation"] = reservation
            messages.success(request, "Reserva generada correctamente.")
            return redirect("confirmation")
        print("[Sistema] No existen cupos disponibles para la selección realizada.")
        messages.error(request, "No existen cupos disponibles para la selección realizada.")

    return render(request, "booking/schedule.html", {"user": user, "form": form, "campaigns": get_campaigns(), "selected_campaign": selected_campaign, "vaccines": get_vaccines(selected_campaign), "points": get_points(selected_campaign), "slots": get_slots(selected_campaign, selected_vaccine, selected_point)})


def confirmation_view(request: HttpRequest) -> HttpResponse:
    user = _current_user(request)
    reservation = request.session.get("reservation")
    if not user or not reservation:
        return redirect("dashboard")
    return render(request, "booking/confirmation.html", {"user": user, "reservation": reservation})


def logout_view(request: HttpRequest) -> HttpResponse:
    request.session.flush()
    messages.info(request, "Sesión cerrada.")
    return redirect("home")
