import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login', 
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  model: any = {};
  loaded: boolean = true;

  constructor(private authService: AuthService, private alertify: AlertifyService, private router: Router) { }

  ngOnInit() {
  }

  login() {
    this.loaded = false;
    this.authService.login(this.model).subscribe(response => {
      this.alertify.success('Successfull loged in.');
      this.router.navigate(['/home']);
      this.loaded = true;
    }, error => {
      this.alertify.error(error);
    });
  }

  cancel() {
    this.router.navigate(['/home']);
  }


}
