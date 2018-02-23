import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidatorFn, AbstractControl } from '@angular/forms'
import { Observable } from 'rxjs'
import { User } from '../shared/user'
import { UserService } from '../services/user/user.service'

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
})

export class RegistrationComponent implements OnInit {

  registrationForm: FormGroup
  user: User = new User()
  
  constructor(private userService: UserService) {}

  ngOnInit() {
    this.registrationForm = new FormGroup({
      firstName: new FormControl(this.user.firstName, [Validators.required]),
      lastName: new FormControl(this.user.lastName, [Validators.required]),
      email: new FormControl(this.user.email, [Validators.required],[this.emailValidator.bind(this)]),
      username: new FormControl(this.user.username, Validators.required),
      password: new FormControl(this.user.password, Validators.required),
    })
  }

  public onSubmit(form: FormGroup) {
    if (!this.registrationForm.valid) {
      return
    }
    this.user = form.value
    this.userService.saveUser(this.user).subscribe(result => {
      console.log(result)
    })
  }

  public emailValidator(control: FormControl): Observable<{ invalidEmail : boolean }> {
    if (!control.value) {
      return
    }
    return this.userService.isEmailExists(control.value).map(result => {
      return result ? { invalidEmail : true } : null
    })
  }
}
