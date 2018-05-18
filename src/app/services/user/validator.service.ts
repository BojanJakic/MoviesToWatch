import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms'
import { Observable } from 'rxjs'
import { Http } from '@angular/http'
import 'rxjs/add/operator/catch';
import { User } from '../../shared/user'

@Injectable()
export class ValidatorService {

  url: string = 'http://localhost:4000'

  constructor(private http: Http) { }

  emailValidator = (email: string): Observable<User> => {
    return this.http.get(this.url + '/api/findByEmail/user/' + email).map(response => {
      return response.json()
    }).catch(error => {
      return Observable.throw('Server Error !')
    })
  }

  usernameValidator = (username: string): Observable<User> => {
    return this.http.get(this.url + '/api/findByUsername/user/' + username).map(response => {
      return response.json()
    }).catch(error => {
      return Observable.throw('blah blah !')
    })
  }
}
