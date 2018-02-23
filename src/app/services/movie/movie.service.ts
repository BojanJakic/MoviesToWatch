import { Injectable } from '@angular/core';
import { Http } from '@angular/http'
import { Observable } from 'rxjs'
import 'rxjs/add/operator/map'
import { Movie } from '../../shared/movie'
import 'rxjs/add/operator/catch';

@Injectable()
export class MovieService {

  private url = 'http://localhost:4000'

  constructor(private http: Http) { }

  public saveMovie(movie: Movie): Observable<string> {
    return this.http.post(this.url + '/api/save/movie', movie).map(res => {
      return res.status
    }).catch((error: any) => {
      return Observable.throw(error.json ? error.json().error : error || 'Server error')
    });
  }

  public getAllMovies(): Observable<Movie[]> {
    return this.http.get(this.url + '/find/movie').map(res => {
      return res.json()
    })
  }
}