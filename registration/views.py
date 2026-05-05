from django.shortcuts import render, redirect
from .admin import UserCreationForm
import random
from django.core.cache import cache
from django.conf import settings
import requests
from django.contrib.auth import login


def registration(request):
    if request.method == 'POST':
        form = request.POST
        form1 = UserCreationForm(form) #сделал для проверки формы request.session['form'] = form нельзя сделать для UserCreationForm поэтому сделал так
        if form1.is_valid():
            request.session['form'] = form
            telegram_code = ''.join(random.choices('0123456789', k=6))
            phone = request.POST.get('phone')
            request.session['phone'] = phone
            cache.set(f'telegram_code_{phone}', telegram_code, timeout=120)
            response = requests.post('https://gate.smsaero.ru/v2/telegram/send',
                                     auth=(settings.SMS_AERO_EMAIL, settings.SMS_AERO_API_KEY),
                                     data={
                                         'number': phone[1:],
                                         'code': telegram_code
                                     })
            print(response.json())
            return redirect('verification_phone')
        return render(request, 'registration/registration.html', context={'form': form1}) #если invalid передаём на фронт форму c form.errors
    else:
        form = UserCreationForm()
        return render(request, 'registration/registration.html', context={'form': form})

def verify_phone_number(request):
    if request.method == 'POST':
        telegram_code = request.POST.get('verification_code')
        phone = request.session.get('phone')
        telegram_code_real = cache.get(f'telegram_code_{phone}', '')
        if telegram_code == telegram_code_real:
            form = request.session.get('form')
            form = UserCreationForm(form) # тут уже проверенная форма из сессии
            user = form.save()
            login(request, user)
            return redirect('/')
    return render(request, 'registration/verification_phone.html')