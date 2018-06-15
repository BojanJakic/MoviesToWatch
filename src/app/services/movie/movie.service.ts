import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, URLSearchParams } from '@angular/http'
import { HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs'
import 'rxjs/add/operator/map'
import { Movie } from '../../shared/movie'
import 'rxjs/add/operator/catch';
import { LocalStorageService } from '../local-storage/local.storage.service'

@Injectable()
export class MovieService {

  private url = 'http://localhost:4000'

  constructor(private http: Http, private localStorage: LocalStorageService) { }

  saveMovie = (movie: Movie): Observable<any> => {

    let accessToken;
    let refreshToken
    const localStorageToken = this.localStorage.getTokens()
    const localStorageUser = this.localStorage.getUser()
    
      console.log(localStorageToken)
    
    localStorageToken ? (accessToken = localStorageToken.accessToken, refreshToken = localStorageToken.refreshToken) : (accessToken = null, refreshToken = null)
    //const headers = new HttpHeaders()
    return this.http.post(this.url + '/api/save/movie', { accessToken: accessToken, refreshToken: refreshToken, movie: movie, user: localStorageUser }).map(res => {
      return res.json()
    }).catch((error: any) => {
      return Observable.throw(error.json ? error.json().error : error || 'Server error')
    });
  }

  getAllMovies = (): Observable<Movie[]> => {
    return this.http.get(this.url + '/api/findAll/movie').map(res => {
      return res.json()
    })
  }
}