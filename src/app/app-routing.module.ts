import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RegistrationComponent } from './registration/registration.component'
import { OmdbComponent } from './movie/omdb/omdb.component'
import { MovieListComponent } from './movie/movie-list/movie-list.component'
import { LoginComponent } from './login/login.component'
import { HomeComponent } from './home/home.component'

const appRoutes: Routes = [
    { path : '', component: HomeComponent},
    { path : 'registration', component: RegistrationComponent},
    { path : 'omdb', component: OmdbComponent},
    { path : 'movies', component: MovieListComponent},
    { path : 'login', component: LoginComponent}
]

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}