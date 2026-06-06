from django import forms

from .mock_data import CAMPAIGNS, get_points, get_slots, get_vaccines


class LoginForm(forms.Form):
    email = forms.EmailField(label="Correo electrónico")
    password = forms.CharField(label="Contraseña", widget=forms.PasswordInput)


class RegisterForm(forms.Form):
    full_name = forms.CharField(label="Nombre completo", max_length=120)
    identifier = forms.CharField(label="RUN o identificador", max_length=30)
    email = forms.EmailField(label="Correo electrónico")
    password = forms.CharField(label="Contraseña", widget=forms.PasswordInput, min_length=6)


class ScheduleForm(forms.Form):
    campaign = forms.ChoiceField(label="Campaña")
    vaccine = forms.ChoiceField(label="Vacuna")
    point = forms.ChoiceField(label="Punto de vacunación")
    slot = forms.ChoiceField(label="Horario")

    def __init__(self, *args, campaign_id=None, vaccine=None, point=None, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields["campaign"].choices = [(item["id"], item["name"]) for item in CAMPAIGNS]
        self.fields["vaccine"].choices = [(item, item) for item in get_vaccines(campaign_id or CAMPAIGNS[0]["id"])]
        self.fields["point"].choices = [(item, item) for item in get_points(campaign_id or CAMPAIGNS[0]["id"])]
        self.fields["slot"].choices = [(item, item) for item in get_slots(campaign_id or CAMPAIGNS[0]["id"], vaccine, point)]
