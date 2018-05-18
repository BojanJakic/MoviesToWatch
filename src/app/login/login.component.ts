import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms'
import { UserService } from '../services/user/user.service'
import { LocalStorageService } from '../services/local-storage/local.storage.service'
import { LoginService } from '../services/login/login.service'
import { Router } from '@angular/router'
import { ToastrHandler } from '../toastr/toastr-handler'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup

  constructor(private toasts: ToastrHandler, private userService: UserService, private localStorage: LocalStorageService, private loginService: LoginService, private router : Router) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      username: new FormControl(),
      password: new FormControl()
    })
  }

  login = (form: FormGroup) => {
    this.loginService.login(form.value.username, form.value.password).subscribe((result) => {
      if (result.success) {
        this.localStorage.saveToken(result.token)
        this.localStorage.saveUser(result.user)
        this.router.navigate(['/'])
      }
      this.toasts.showMessage(result)
    })
  }

  logout = () => {
    this.localStorage.deleteToken()
    this.localStorage.deleteUser()
  }
}
