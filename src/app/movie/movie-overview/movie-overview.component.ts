import { Component, OnInit, Input } from '@angular/core';
import { Movie } from '../../shared/movie'

@Component({
  selector: 'app-movie-overview',
  templateUrl: './movie-overview.component.html',
  styleUrls: ['./movie-overview.component.css']
})
export class MovieOverviewComponent implements OnInit {

  @Input() movie: Movie

  constructor() { }

  ngOnInit() {
  }

}
