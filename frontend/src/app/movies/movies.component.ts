import { Component, OnInit } from '@angular/core';
import { Movie } from '../movie';
import { MovieService } from '../movie.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css'],
  
})
export class MoviesComponent implements OnInit {

  movies: Movie[] = [];
  selectedMovie?: Movie;
 

  constructor(private movieService: MovieService) { }

  getMovies(): void {
    this.movieService.getMovies()
      .subscribe((data:Movie[]) => {
        this.movies = data;
        for (let movie of this.movies) {
          movie.releaseDate = new Date(movie.releaseDate);
        }
        console.log(data)
      },
        err => console.error(err),
        () => console.log("loaded movie")
      
      );  
  }

  ngOnInit(): void {
    this.getMovies();
  }

  onSelect(movie: Movie): void {
    this.selectedMovie = movie;
  }

  upvote(selectedMovie: Movie): void {
    this.movieService.upvoteMovie(selectedMovie)
      .subscribe((data:Movie) => {
        this.selectedMovie = data;
        this.selectedMovie.releaseDate = new Date(selectedMovie.releaseDate);
      },
        err => console.error(err),
        () => console.log("loaded movie")
      
      ); 
      this.ngOnInit();
  }

}
