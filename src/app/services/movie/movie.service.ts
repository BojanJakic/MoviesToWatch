import { Injectable } from '@angular/core';
import { Http } from '@angular/http'
import { Observable } from 'rxjs'
import 'rxjs/add/operator/map'
import { Movie } from '../../shared/movie'
import 'rxjs/add/operator/toPromise'

@Injectable()
export class MovieService {

  private url = 'http://localhost:4000/save'

  constructor(private http: Http) { }

  // public saveMovie(movie: Movie): Observable<string> {
  //   console.log('mov.ser ' + movie)
  //   return this.http.post(this.url + 'save/movie', movie).map(res => {
  //     return res.json()
  //   })
  // }

  public saveMovie(movie) {
    console.log('service' + movie.Title)
    this.http.post(this.url, movie).toPromise().then(function (response) {
      console.log('response ' + response.json())
    })
  }
}
