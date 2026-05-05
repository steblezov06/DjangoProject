from . import views
from django.urls import path

urlpatterns = [
    path('', views.enter, name="enter"),
    path('logout/', views.logout_view, name='logout'),
]