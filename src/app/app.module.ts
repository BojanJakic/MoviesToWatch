import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatAutocompleteModule } from '@angular/material'
import { MatInputModule, MatButtonModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { ReactiveFormsModule } from '@angular/forms'
import { HttpModule } from '@angular/http'
import { MatGridListModule } from '@angular/material/grid-list';
import { ToastModule } from 'ng2-toastr/ng2-toastr'
import { ToastOptions } from 'ng2-toastr'

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
import { MovieListComponent } from './movie/movie-list/movie-list.component';
import { ValidatorService } from './services/user/validator.service';
import { LoginComponent } from './login/login.component'
import { LocalStorageService } from './services/local-storage/local.storage.service'
import { LoginService } from './services/login/login.service'
import { VoteService } from './services/vote/vote.service'
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './home/home.component'
import { ToastrCustomOptions } from './shared/toastr-custom-options'
import { ToastrHandler } from './toastr/toastr-handler'

@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    HeaderComponent,
    SidebarComponent,
    OmdbComponent,
    MovieOverviewComponent,
    MovieListComponent,
    LoginComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    MatInputModule,
    MatAutocompleteModule,
    MatGridListModule,
    MatButtonModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpModule,
    ToastModule.forRoot()
  ],
  providers: [
    OmdbService, MovieService, UserService, ValidatorService, LocalStorageService, LoginService, ToastrHandler, VoteService,
    { provide: ToastOptions, useClass: ToastrCustomOptions }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
