from django.urls import path
from .views import index

# path(route, view)
urlpatterns = [
    path('', index),
    # these are all managed by react router, so all views go to index.html.
    path('join', index),
    path('create', index),
    # dynamic url < >, which means you can pass thur a roomCode and create a route
    path('room/<str:roomCode>', index)
]
