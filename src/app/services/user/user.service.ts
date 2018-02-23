import { Injectable } from '@angular/core';
import { Http } from '@angular/http'
import { Observable } from 'rxjs'
import 'rxjs/add/operator/catch';
import { User } from '../../shared/user'

@Injectable()
export class UserService {

  url: string = 'http://localhost:4000'

  constructor(private http: Http) { }

  public saveUser(user: User): Observable<string> {
    return this.http.post(this.url + '/save/user', user).map(response => {
      return response.json()
     }).catch(error => {
      return Observable.throw('User Has not been saved !')
    })
  }

  public isEmailExists(email: string): Observable<User> {
    return this.http.get(this.url + '/findByEmail/user/' + email).map(response => {
      return response.json()
    }).catch(error => {
      return Observable.throw('Server Error !')
    })
  }
}

