import { Injectable } from '@angular/core';
import { Http } from '@angular/http'
import { Observable } from 'rxjs'
import 'rxjs/add/operator/catch';

@Injectable()
export class LoginService {

  private url: string = 'http://localhost:4000'

  constructor(private http: Http) { }

  login = (username: string, password: string) => {
    return this.http.post(this.url + '/api/login/user/', { username: username, password: password }).map(function (response) {
      return response.json()
    }).catch(function (error) {
      return Observable.throw('error!')
    })
  }
}
