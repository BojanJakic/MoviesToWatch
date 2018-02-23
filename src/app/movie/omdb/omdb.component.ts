import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms'
import { OmdbService } from '../../services/omdb/omdb.service'
import { Movie } from '../../shared/movie'
import { MovieService } from '../../services/movie/movie.service'

@Component({
  selector: 'app-omdb',
  templateUrl: './omdb.component.html',
  styleUrls: ['./omdb.component.css']
})
export class OmdbComponent implements OnInit {

  listOfMovies: Movie[] = []
  movie: Movie = new Movie
  searchField: FormControl = new FormControl()
  
  constructor(private omdbService: OmdbService, private movieService: MovieService) { }

  ngOnInit() {
    this.searchField.valueChanges.subscribe(usersInput => {
      this.omdbService.getOmdbMovies(usersInput).subscribe(data => {
        this.listOfMovies = data
      })
    })
  }

  public showMovieDetails(movie: Movie) {
    this.movie = movie
  }

  public saveMovie() {
    console.log('component')
    this.movieService.saveMovie(this.movie).subscribe(data => {
      console.log('response : ' + data)
    })
  }
}
