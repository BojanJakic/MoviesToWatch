import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http'
import { Observable } from 'rxjs'
import 'rxjs/add/operator/map'
import { Movie } from '../../shared/movie'

@Injectable()
export class OmdbService {

  private url = 'http://www.omdbapi.com/?apikey=cfbcc375&s='

  constructor(private http: Http) { }

  public getOmdbMovies(usersInput: string): Observable<Movie[]> {
    return this.http.get(this.url + usersInput).map((response: Response) => {
      return <Movie[]>response.json().Search
    })
  }
}
