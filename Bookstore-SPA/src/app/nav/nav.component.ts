import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { Router } from '@angular/router';
import { AlertifyService } from '../_services/alertify.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router, private alertify: AlertifyService) { }

  items: string[] = [
    'All',
    'Action and adventure',
    'Crime and detective',
    'Fantasy',
    'Horror',
    'Romance',
  ];

  ngOnInit() {
  }

  userProfile() {
    if(this.authService.loggedIn() === true)
    {
      
    }
    else {
      this.router.navigate(['/login']);
    }
  }

  logged() {
    return this.authService.loggedIn();
  }

  logged2() {
    return !this.authService.loggedIn();
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['']);
    this.alertify.message('logged out');
  }

}
