import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http'
import { Observable } from 'rxjs'
import 'rxjs/add/operator/map'
import { Movie } from '../../shared/movie'

@Injectable()
export class OmdbService {

  private urlAll = 'http://www.omdbapi.com/?apikey=cfbcc375&s='
  private urlOne = 'http://www.omdbapi.com/?apikey=cfbcc375&i='

  constructor(private http: Http) { }

  getMovies = (usersInput: string): Observable<Movie[]> => {
    return this.http.get(this.urlAll + usersInput).map((response: Response) => {
      return <Movie[]>response.json().Search
    })
  }

  getMovieById(id: string): Observable<Movie> {
    return this.http.get(this.urlOne + id).map((response: Response) => {
      return <Movie>response.json()
    })
  }

  getPoster = (url: string): Observable<any> => {
    return this.http.get(url).map((response: Response) => {
      return response.json()
    })
  }
}
