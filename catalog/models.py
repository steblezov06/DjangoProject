from registration.models import MyUser as User
from django.db import models


class Product(models.Model):
    name = models.CharField(max_length=100)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    description = models.TextField()
    image = models.ImageField(upload_to='pictures/')
    liked_by = models.ManyToManyField(User, related_name='liked_products')

    def __str__(self):
        return self.name

    @property
    def likes(self):
        return self.liked_by.count()