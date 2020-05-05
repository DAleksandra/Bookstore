import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';

@Injectable({
    providedIn: 'root'
  })
export class Admin implements CanActivate{

    user: string;

    constructor(private authService: AuthService, private router: Router, private alertify: AlertifyService) {}

    canActivate(): boolean {
        this.user = localStorage.getItem('user');
        if (this.user.search('Admin') > 0) {
            return true;
    }
        this.alertify.error('You have to be logged in as admin.');
        this.router.navigate(['/home']);
        return false;
}
}
