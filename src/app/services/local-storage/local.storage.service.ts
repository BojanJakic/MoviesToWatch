import { Injectable } from '@angular/core';
import { User } from '../../shared/user'

@Injectable()
export class LocalStorageService {

  user: User = new User()

  constructor() { }

  saveToken = (token: string) => {
    localStorage.setItem('jwt-movie2watch', token)
  }

  getToken = () => {
    return localStorage.getItem('jwt-movie2watch')
  }

  deleteToken = () => {
    localStorage.removeItem('jwt-movie2watch')
  }

  saveUser = (user: User) => {
    localStorage.setItem('user-movie2watch', JSON.stringify(user))
  }

  getUser = () => {
    return JSON.parse(localStorage.getItem('user-movie2watch'))
  }

  deleteUser = () => {
    localStorage.removeItem('user-movie2watch')
  }

}
