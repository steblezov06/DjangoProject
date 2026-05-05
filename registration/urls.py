from . import views
from django.urls import path

urlpatterns = [
    path('', views.registration, name="registration"),
    path('verify_phone_number/', views.verify_phone_number, name='verification_phone'),
]