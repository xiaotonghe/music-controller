from django.shortcuts import render

# Create your views here.


def index(request, *args, **kwargs):
    # it will take request and the template and return the html
    return render(request, 'frontend/index.html')
