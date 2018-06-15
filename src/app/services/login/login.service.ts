import { Injectable } from '@angular/core';
import { Http } from '@angular/http'
import { Observable } from 'rxjs'
import { LocalStorageService } from '../local-storage/local.storage.service'
import 'rxjs/add/operator/catch';

@Injectable()
export class LoginService {

  private url: string = 'http://localhost:4000'

  constructor(private http: Http, private localStorageService: LocalStorageService) { }

  login = (username: string, password: string) => {
    return this.http.post(this.url + '/api/login/user/', { username: username, password: password }).map(function (response) {
      return response.json()
    }).catch(function (error) {
      return Observable.throw('error!')
    })
  }

  logout = () => {
    const user = this.localStorageService.getUser()
    const refreshToken = this.localStorageService.getTokens().refreshToken
    return this.http.post(this.url + '/api/logout/user/', { user: user, refreshToken: refreshToken }).map(function (response) {
      return response.json()
    }).catch(function (error) {
      return Observable.throw('error!')
    })
  }
}
