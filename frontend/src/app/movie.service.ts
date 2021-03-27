import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { Movie } from './movie';
import { stringify } from '@angular/compiler/src/util';



@Injectable({
  providedIn: 'root'
})
export class MovieService {

  
  
  private moviesUrl = 'http://127.0.0.1:8000/moviesapp/movies';

  constructor(private http: HttpClient) { }
  getMovies(): Observable<Movie[]>{
    let httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    // console.log("helllo");
    // let m = { movieName: "abc", releaseDate: new Date("1999-08-23"), upvoteCount:0 };
    // return m;
    return this.http.get<Movie[]>(this.moviesUrl, httpOptions);
  }

  upvoteMovie(movie: Movie): Observable<Movie> {
    let url: string;
    url = this.moviesUrl + '/'+ movie.id.toString();
    console.log(url);
    let httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.get<Movie>(url, httpOptions);
  }
} 
