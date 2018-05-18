import { Component, OnInit, Input } from '@angular/core';
import { Movie } from '../../shared/movie'
import { OmdbService } from '../../services/omdb/omdb.service'

@Component({
  selector: 'app-movie-overview',
  templateUrl: './movie-overview.component.html',
  styleUrls: ['./movie-overview.component.css']
})
export class MovieOverviewComponent implements OnInit {

  @Input() movie: Movie

  constructor(private omdbService: OmdbService) { }

  ngOnInit() {
  }

  getPoster = (url: string) => {
    console.log(url)
    this.omdbService.getPoster(url).subscribe(data => {
      console.log(data)
    })
  }

  voteMovie = (movieId: string) => {
    console.log(movieId)
  }

}
