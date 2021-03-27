from django.http import HttpResponse, JsonResponse
from django.shortcuts import render, redirect
from moviesapp.models import Movie
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from moviesapp.serializers import MovieSerializer
import json
from django.core.serializers.json import DjangoJSONEncoder

# Create your views here.
def index(request):
    return HttpResponse("Movie Database")

def getMovies(request):
    x = Movie.objects.order_by('releaseDate')
    movieList = []
    for movie in x:
        movieDict = {"movieName":movie.movieName, "releaseDate":movie.releaseDate, "upvoteCount":movie.upvoteCount}
        movieList.append(movieDict)

    movieListData = {"data":movieList}
    movieJson = json.dumps(movieListData, cls=DjangoJSONEncoder)

    return HttpResponse(movieJson)

@csrf_exempt
def moviesList(request):
    if request.method == 'GET':
        movies = Movie.objects.order_by('-releaseDate')
        serializer = MovieSerializer(movies,many=True)
        return JsonResponse(serializer.data,safe=False)

def upvoteMovie(request,id):
    try:
        movie = Movie.objects.get(id=id)
    except Movie.DoesNotExist:
        return HttpResponse(status=404)
    
    if request.method == 'GET':
        movie.upvoteCount += 1
        movie.save()
        serializer = MovieSerializer(movie)
        return JsonResponse(serializer.data,safe=False)