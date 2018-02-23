import { Component, OnInit } from '@angular/core';
import { Movie } from '../../shared/movie'
import { MovieService } from '../../services/movie/movie.service'

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {

  movie: Movie = new Movie()
  listOfMovies: Movie[] = []

  constructor(private movieService: MovieService) { }

  ngOnInit() {
    this.movieService.getAllMovies().subscribe(data => {
      this.listOfMovies = data
    })
  }
}
