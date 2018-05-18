import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidatorFn, AbstractControl } from '@angular/forms'
import { Observable } from 'rxjs'
import { User } from '../shared/user'
import { UserService } from '../services/user/user.service'
import { ToastrHandler } from '../toastr/toastr-handler'
import { Router } from '@angular/router'

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
})

export class RegistrationComponent implements OnInit {

  registrationForm: FormGroup
  user: User = new User()

  constructor(private userService: UserService, private toastr: ToastrHandler, private router: Router) { }

  ngOnInit() {
    this.registrationForm = new FormGroup({
      firstName: new FormControl(this.user.firstName, [Validators.required]),
      lastName: new FormControl(this.user.lastName, [Validators.required]),
      email: new FormControl(this.user.email, [Validators.required, Validators.maxLength(10), Validators.pattern("^[A-Za-z0-9.%+-]+@[A-Za-z0-9.-]+\.[a-zA-Z]{2,}")], [this.validateEmail]),
      username: new FormControl(this.user.username, [Validators.required, Validators.minLength(3), Validators.maxLength(16)], [this.validateUsername]),
      password: new FormControl(this.user.password, [Validators.required, Validators.minLength(3), Validators.maxLength(16)]),
    })
  }

  onSubmit = (form: FormGroup) => {
    if (!this.registrationForm.valid) {
      return
    }
    this.user = form.value
    this.userService.saveUser(this.user).subscribe(response => {
      console.log(response)
      if (response.success) {
        this.router.navigate(['/'])
      }
      this.toastr.showMessage(response)
    })
  }

  validateEmail = (control: FormControl): Observable<{ invalidEmail: boolean }> => {
    if (!control.value) {
      return
    }
    return this.userService.findByEmail(control.value).map(result => {
      return result ? { invalidEmail: true } : null
    })
  }

  validateUsername = (control: FormControl): Observable<{ invalidUsername: boolean }> => {
    if (!control.value) {
      return
    }
    return this.userService.findByUsername(control.value).map(result => {
      return result ? { invalidUsername: true } : null
    })
  }
}
