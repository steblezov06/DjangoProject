from . import views
from django.urls import path

app_name = 'catalog'

urlpatterns = [
    path('', views.catalog, name="catalog"),
    path('like/<int:pk>', views.like, name='like'),
    path('get_likes/', views.get_likes, name='get_likes')
]