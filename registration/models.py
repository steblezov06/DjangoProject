from django.db import models
from django.contrib.auth.models import BaseUserManager, AbstractBaseUser
from django.core.validators import RegexValidator

class MyUserManager(BaseUserManager):
    def create_user(self, email, first_name, last_name, phone, password=None):
        """
        Creates and saves a User with the given email, first_name, last_name, phone and password.
        """
        if not email:
            raise ValueError("Users must have an email address")

        if not phone:
            raise ValueError("Users must have a phone number")

        user = self.model(
            email=self.normalize_email(email),
            first_name=first_name,
            last_name=last_name,
            phone=phone,
        )

        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, first_name, last_name, phone, password=None):
        """
        Creates and saves a superuser with the given email, first_name, last_name, phone and password.
        """
        user = self.create_user(
            email=email,
            first_name=first_name,
            last_name=last_name,
            phone=phone,
            password=password,
        )
        user.is_admin = True
        user.save(using=self._db)
        return user


class MyUser(AbstractBaseUser):

    name_validator = RegexValidator(
        regex=r'^[А-ЯЁA-Z][а-яёa-z]+$',
        message='Имя должно начинаться с заглавной буквы и содержать только буквы',
        code='invalid_name'
    )


    email_validator = RegexValidator(
        regex=r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$',
        message='Введите корректный email',
        code='invalid_email'
    )


    phone_validator = RegexValidator(
        regex=r'^\+7\d{10}$',
        message='Номер телефона должен быть(10 цифр после +7)',
        code='invalid_phone'
    )




    email = models.EmailField(
        verbose_name="email address",
        max_length=255,
        unique=True,
        validators = [email_validator],
    )

    first_name = models.CharField(
        max_length=100,
        verbose_name="first name",
        validators=[name_validator],
    )


    last_name = models.CharField(
        max_length=100,
        verbose_name="last name",
        validators=[name_validator],
    )
    phone = models.CharField(
        max_length=12,
        unique=True,
        verbose_name="phone number",
        validators=[phone_validator],
    )
    is_active = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=False)

    objects = MyUserManager()

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["first_name", "last_name", "phone"]

    def __str__(self):
        return self.email

    def has_perm(self, perm, obj=None):
        return True

    def has_module_perms(self, app_label):
        return True

    @property
    def is_staff(self):
        return self.is_admin


    #всё с djando custom authorization