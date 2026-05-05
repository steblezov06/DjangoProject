from django.http import JsonResponse
from django.shortcuts import render
from .models import Product


def catalog(request):
    context = {
        'products': Product.objects.all(),
    }
    return render(request, 'catalog/catalog.html', context)

def like(request, pk):
    product = Product.objects.get(pk=pk)
    if product.liked_by.filter(id=request.user.id).exists():
        product.liked_by.remove(request.user)
    else:
        product.liked_by.add(request.user)
    return JsonResponse({'total': product.likes})

def get_likes(request):
    product = Product.objects.all()
    result = dict()
    for item in product:
        result[item.id] = item.likes
    return JsonResponse(result)