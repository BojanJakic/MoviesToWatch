import { Injectable } from '@angular/core';
import { Movie } from '../../shared/movie'
import { Http } from '@angular/http'

@Injectable()
export class VoteService {

  private url = 'http://localhost:4000'

  constructor(private http: Http) { }

  voteMovie = (userId: string, movieId: string, token: string) => {
    return this.http.post(this.url + '/api/vote', { vote: { userId: userId, movieId: movieId }, token: token }).map(res => {
      return res.json()
    })
  }

}
