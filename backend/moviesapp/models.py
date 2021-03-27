from django.db import models

# Create your models here.
class Movie(models.Model):
    movieName = models.CharField(max_length=100)
    releaseDate = models.DateField()
    upvoteCount = models.PositiveIntegerField(default=0)

    def __str__(self):
        return f"{self.movieName} released on {self.releaseDate}" 
