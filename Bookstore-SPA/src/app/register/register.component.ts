import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  loaded: boolean = true;

  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService, private alertify: AlertifyService) { }

  ngOnInit() {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]],
      passwordConfirm: ['', Validators.required],

    }, {validator: this.passwordMatchValidator});
  }

  passwordMatchValidator(g: FormGroup) {
    return g.get('password').value === g.get('passwordConfirm').value ? null : {'mismatch': true};
  }

  cancel() {
    this.router.navigate(['home']);
  }

  register() {
    this.loaded = false;
    const user = {
      username: this.registerForm.get('username').value,
      password: this.registerForm.get('password').value,
      email: this.registerForm.get('email').value,
      userType: 'Client'
    };
    this.authService.register(user).subscribe(x => {
      this.alertify.success('Sucessfully registered. You can login now!');
      this.router.navigate(['login']);
      this.loaded = true;
    }, error => {
      this.alertify.error("You can't register now. Try again!");
    });
  }

}
