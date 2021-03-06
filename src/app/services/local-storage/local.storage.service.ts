import { Injectable } from '@angular/core';
import { User } from '../../shared/user'

@Injectable()
export class LocalStorageService {

  user: User = new User()

  constructor() { }

  saveTokens = (tokens: {}) => {
    localStorage.setItem('jwt-movie2watch', JSON.stringify(tokens))
  }

  getTokens = () => {
    return JSON.parse(localStorage.getItem('jwt-movie2watch'))
  }

  deleteTokens = () => {
    localStorage.removeItem('jwt-movie2watch')
  }

  setNewAccessToken = (newAccessToken: string) => {
    let tokens = this.getTokens()
    tokens.accessToken = newAccessToken
    this.saveTokens(tokens)
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
