from django.conf import settings
from django.contrib import admin
from django.urls import path, include
from django.conf.urls.static import static


urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('main.urls')),
    path('catalog/', include('catalog.urls')),
    path('contact/', include('contact.urls')),
    path('enter/', include('enter.urls')),
    path('registration/', include('registration.urls')),
]
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT) #нужно чтобы получать картинки из media
