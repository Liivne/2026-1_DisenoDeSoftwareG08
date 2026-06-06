from django.urls import path

from . import views

urlpatterns = [
    path("", views.home, name="home"),
    path("login/", views.login_view, name="login"),
    path("register/", views.register_view, name="register"),
    path("dashboard/", views.dashboard, name="dashboard"),
    path("campaigns/", views.campaigns_view, name="campaigns"),
    path("schedule/", views.schedule_view, name="schedule"),
    path("confirmation/", views.confirmation_view, name="confirmation"),
    path("logout/", views.logout_view, name="logout"),
]
