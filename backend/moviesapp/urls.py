from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('movies', views.moviesList, name='movies'),
    path('movies/<int:id>', views.upvoteMovie, name='movies'),
]
