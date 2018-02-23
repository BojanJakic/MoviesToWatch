import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatAutocompleteModule } from '@angular/material'
import { MatInputModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { ReactiveFormsModule } from '@angular/forms'
import { Routes, RouterModule } from '@angular/router'
import { HttpModule } from '@angular/http'
import { MatGridListModule } from '@angular/material/grid-list';

import { UserService } from './services/user/user.service'
import { OmdbService } from './services/omdb/omdb.service'
import { MovieService } from './services/movie/movie.service'
import { AppComponent } from './app.component';
import { RegistrationComponent } from './registration/registration.component';
import { User } from './shared/user';
import { HeaderComponent } from './header/header.component'
import { SidebarComponent } from './sidebar/sidebar.component';
import { OmdbComponent } from './movie/omdb/omdb.component';
import { MovieOverviewComponent } from './movie/movie-overview/movie-overview.component';
import { MovieListComponent } from './movie/movie-list/movie-list.component'

const routes = [
  { path : '', component: RegistrationComponent},
  { path : 'omdb', component: OmdbComponent},
  { path : 'movies', component: MovieListComponent}
]
@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    HeaderComponent,
    SidebarComponent,
    OmdbComponent,
    MovieOverviewComponent,
    MovieListComponent
  ],
  imports: [
    BrowserModule,
    MatInputModule,
    MatAutocompleteModule,
    MatGridListModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    HttpModule
  ],
  providers: [User, OmdbService, MovieService, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
