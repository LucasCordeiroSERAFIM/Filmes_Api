import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Filmes } from '../filme';


@Injectable({
  providedIn: 'root'
})
export class MovieService {
  
  private apiUrl = 'https://api.themoviedb.org/3/movie';
  private apiKey = 'c396d22b6ed9fb939b51c0caf72412df';

  constructor(private http: HttpClient) { }

  /**flmes em lançamento */
  getUpcomingMovies(): Observable<Filmes> {
    const url = `${this.apiUrl+"/upcoming"}?api_key=${this.apiKey}`;
    return this.http.get<Filmes>(url);
  }

  /*filme por id*/
  getMovieDetails(movieId: number): Observable<Filmes> {
    const url = `${this.apiUrl}/${movieId}?api_key=${this.apiKey}&language=en-US`;
    return this.http.get<Filmes>(url);
  }

  /**Filmes top rated */
  getTopRatedMovie(){
    const url = `${this.apiUrl+"/top_rated"}?api_key=${this.apiKey}`;
    return this.http.get<Filmes>(url);
  }

  /** filmes por gênero */

  getMoviebygenre(){
    const url = `${this.apiUrl+"/genre"}?api_key=${this.apiKey}`;
    return this.http.get<Filmes>(url);
  }
}