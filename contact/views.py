
from django.shortcuts import render, redirect
from .forms import FeedbackForm

def contact(request):
    if request.method == 'POST':
        form = FeedbackForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('/')
    else:
        form = FeedbackForm()
    return render(request, 'contact/contact.html', context={'form': form})
