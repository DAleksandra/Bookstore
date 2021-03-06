import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../_models/user';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject } from 'rxjs';
import { EventEmitter } from 'protractor';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = 'http://localhost:5000/api/auth/';
  jwtHelper = new JwtHelperService();
  decodedToken: any;
  currentUser: User;
  public userType = new BehaviorSubject<string>('');
  public welcomeUser = new BehaviorSubject<string>('');

constructor(private http: HttpClient) { 
  if (this.jwtHelper.decodeToken(localStorage.getItem('token')) !== null) {
    this.decodedToken = this.jwtHelper.decodeToken(localStorage.getItem('token'));
    this.welcomeUser.next(this.decodedToken.unique_name);
  }     
}

login(model: any)
{
  return this.http.post(this.baseUrl + 'login', model)
  .pipe(
    map((response: any) => {
      const user = response;
      if (user) {
        localStorage.setItem('token', user.token);
        localStorage.setItem('user', JSON.stringify(user.user));
        this.decodedToken = this.jwtHelper.decodeToken(user.token);
        this.currentUser = user.user;
        this.welcomeUser.next(this.decodedToken.unique_name);
        this.userType.next(user.user.userType);
      }
    })
  );
}



register(model: any)
{
  return this.http.post(this.baseUrl + 'register', model);
}

loggedIn() {
  const token = localStorage.getItem('token');
  return !this.jwtHelper.isTokenExpired(token);
}

changePassword(currentPassword: string, newPassword: string) {
  return this.http.put(this.baseUrl + 'password/change', {Username: this.decodedToken.unique_name, NewPassword: newPassword,
                      CurrentPassword: currentPassword});
}

}
