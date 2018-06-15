import { Component, OnInit, Input } from '@angular/core';
import { Movie } from '../../shared/movie'
import { OmdbService } from '../../services/omdb/omdb.service'
import { VoteService } from '../../services/vote/vote.service'
import { LocalStorageService } from '../../services/local-storage/local.storage.service'

@Component({
  selector: 'app-movie-overview',
  templateUrl: './movie-overview.component.html',
  styleUrls: ['./movie-overview.component.css']
})
export class MovieOverviewComponent implements OnInit {

  @Input() movie: Movie

  constructor(private omdbService: OmdbService, private voteService: VoteService, private localStorageService: LocalStorageService) { }

  ngOnInit() {
  }

  getPoster = (url: string) => {
    console.log(url)
    this.omdbService.getPoster(url).subscribe(data => {
      console.log(data)
    })
  }

  voteMovie = (movieId: string) => {
    // let userId, token
    // const user = this.localStorageService.getUser()
    // user ? userId = user._id : userId = '0'
    // const localStorageToken = this.localStorageService.getTokens()
    // localStorageToken ? token = 'Authorization:Bearer ' + localStorageToken : token = null
    // this.voteService.voteMovie(userId, movieId, token).subscribe(data => {
    //   console.log(data)
    // })
    this.localStorageService.setNewAccessToken('aaaaaaaaaaaaa')
  }

}
