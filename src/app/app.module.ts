import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatAutocompleteModule } from '@angular/material'
import { MatInputModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { ReactiveFormsModule } from '@angular/forms'
import { Routes, RouterModule } from '@angular/router'
import { HttpModule } from '@angular/http'

import { OmdbService } from './services/omdb/omdb.service'
import { MovieService } from './services/movie/movie.service'
import { AppComponent } from './app.component';
import { RegistrationComponent } from './registration/registration.component';
import { User } from './shared/user';
import { HeaderComponent } from './header/header.component'
import { SidebarComponent } from './sidebar/sidebar.component';
import { OmdbComponent } from './omdb/omdb.component'

const routes = [
  { path : '', component: RegistrationComponent},
  { path : 'omdb', component: OmdbComponent}
]
@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    HeaderComponent,
    SidebarComponent,
    OmdbComponent
  ],
  imports: [
    BrowserModule,
    MatInputModule,
    MatAutocompleteModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    HttpModule
  ],
  providers: [User, OmdbService, MovieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
