import { Injectable } from '@angular/core';
import { Http } from '@angular/http'
import { HttpParams } from '@angular/common/http'
import { Observable } from 'rxjs'
import 'rxjs/add/operator/catch';
import { User } from '../../shared/user'
import { LocalStorageService } from '../local-storage/local.storage.service'

@Injectable()
export class UserService {

  url: string = 'http://localhost:4000'

  constructor(private http: Http, private localStorageService: LocalStorageService) { }

  saveUser = (user: User): Observable<{ success: boolean, message: string }> => {
    return this.http.post(this.url + '/api/saveUser/user', user).map(response => {
      return response.json()
    }).catch(error => {
      return Observable.throw('User Has not been saved !')
    })
  }

  findByEmail = (email: string): Observable<User> => {
    return this.http.get(this.url + '/api/findByEmail/user/' + email).map(response => {
      return response.json()
    }).catch(error => {
      return Observable.throw('Server Error !')
    })
  }

  findByUsername = (username: string): Observable<User> => {
    return this.http.get(this.url + '/api/findByUsername/user/' + username).map(response => {
      return response.json()
    }).catch(error => {
      return Observable.throw('blah blah !')
    })
  }

  voteMovie = (movieId: string): Observable<any> => {

    let accessToken;
    let refreshToken
    const localStorageToken = this.localStorageService.getTokens()
    const localStorageUser = this.localStorageService.getUser()

    localStorageToken ? (accessToken = localStorageToken.accessToken, refreshToken = localStorageToken.refreshToken) : (accessToken = null, refreshToken = null)
    const data = { accessToken: accessToken, refreshToken: refreshToken, user: localStorageUser, movieId: movieId }
    return this.http.post(this.url + '/api/voteMovie/user', data).map(response => {
      return response.json()
    }).catch((error) => {
      return Observable.throw(error.json ? error.json().error : error || 'Server error')
    })
  }
}

