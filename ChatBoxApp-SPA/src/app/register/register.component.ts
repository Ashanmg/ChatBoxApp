import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Input() valueFromHome: any;
  @Output() cancelRegister = new EventEmitter();
  model: any = {};
  registerForm: FormGroup;

  constructor(private authService: AuthService, private alertifyService: AlertifyService) { }

  ngOnInit() {
    this.registerForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(12)]),
      confirmPassword: new FormControl('', [Validators.required])
    }, this.passwordMatchValidator);
  }

  passwordMatchValidator(g: FormGroup) {
    return g.get('password').value === g.get('confirmPassword').value ? null : {'mismatch': true};
  }

  register() {
    this.authService.register(this.model).subscribe(() => {
      this.alertifyService.success('register successfull');
    }, error => {
      console.log(error);
      this.alertifyService.error(error);
    });
    console.log(this.registerForm.value);
  }

  cancel() {
    this.cancelRegister.emit(false);
  }

}
