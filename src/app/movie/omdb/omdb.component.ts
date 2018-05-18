import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms'
import { OmdbService } from '../../services/omdb/omdb.service'
import { Movie } from '../../shared/movie'
import { MovieService } from '../../services/movie/movie.service'
import { LocalStorageService } from '../../services/local-storage/local.storage.service'
import { ToastrHandler } from '../../toastr/toastr-handler'

@Component({
  selector: 'app-omdb',
  templateUrl: './omdb.component.html',
  styleUrls: ['./omdb.component.css']
})
export class OmdbComponent implements OnInit {

  listOfMovies: Movie[] = []
  movie: Movie = new Movie
  searchField: FormControl = new FormControl()
  
  constructor(private omdbService: OmdbService, private movieService: MovieService, private localStorage: LocalStorageService, private toastr: ToastrHandler) { }

  ngOnInit() {
    this.searchField.valueChanges.subscribe(usersInput => {
      this.omdbService.getMovies(usersInput).subscribe(data => {
        this.listOfMovies = data
      })
    })
  }

  showMovieDetails = (id: string) => {
    this.omdbService.getMovieById(id).subscribe(omdbMovie => {
      this.movie = omdbMovie
    })
  }

  saveMovie = () => {
    let userId = ''
    const user = this.localStorage.getUser()
    user ? userId = user._id : userId = '0'
    this.movie.savedBy = userId
    this.movieService.saveMovie(this.movie).subscribe(data => {
      this.toastr.showMessage(data)
    })
  }
}
