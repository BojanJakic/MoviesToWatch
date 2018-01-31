import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidatorFn } from '@angular/forms'
import { User } from '../shared/user'

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
})

export class RegistrationComponent implements OnInit {

  registrationForm: FormGroup
  // user1: User = new User()
  
  constructor(private user: User) { }

  ngOnInit() {
    this.registrationForm = new FormGroup({
      firstName: new FormControl(this.user.firstName, [Validators.required]),
      lastName: new FormControl(this.user.lastName, [Validators.required]),
      email: new FormControl(this.user.email, [Validators.required, this.emailValidator]),
      username: new FormControl(this.user.username, Validators.required),
      password: new FormControl(this.user.password, Validators.required),
    })
  }

  public onSubmit(user: FormGroup) {
    
  }

  public emailValidator(control: FormControl): { [name: string]: boolean }{
    if (control.value === 'a') {
      return { invalidEmail: true };
    }
  }
}
