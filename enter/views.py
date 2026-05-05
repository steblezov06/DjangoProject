from django.shortcuts import render
from django.contrib.auth.forms import AuthenticationForm
from django.contrib.auth import login
from django.shortcuts import redirect
from django.contrib.auth import logout

def enter(request):
    if request.method == 'POST':
        form = AuthenticationForm(request, data=request.POST)
        if form.is_valid():
            user = form.get_user()
            login(request, user)
            return redirect('/')
    else:
        form = AuthenticationForm()
    return render(request, 'enter/enter.html', {'form': form})

def logout_view(request):
    logout(request)
    return redirect('enter')
