import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';
import { User } from '../_models/user';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = environment.apiUrl + 'auth/';
  jwtHelper = new JwtHelperService();
  decodedToken: any;
  currentUser: User;
  defaultPhotoUrl = new BehaviorSubject<string>('../../assets/user.png');
  currentMainPhotoUrl = this.defaultPhotoUrl.asObservable();

  constructor(private http: HttpClient) { }

  changeMemberMainPhoto(mainPhotoUrl: string) {
    this.defaultPhotoUrl.next(mainPhotoUrl);
  }

  login(model: any) {
    return this.http.post(this.baseUrl + 'login', model).pipe(
      map( (response: any) => {
        const user = response;
        if (user) {
          localStorage.setItem('token', user.token);
          localStorage.setItem('userData', JSON.stringify(user.userData));
          this.decodedToken = this.jwtHelper.decodeToken(user.token);
          this.currentUser = user.userData;
          this.changeMemberMainPhoto(this.currentUser.photoUrl);
        }
      })
    );
  }

  register(model: any) {
    return this.http.post(this.baseUrl + 'register', model);
  }

  loggedIn() {
    const token = localStorage.getItem('token');
    return !this.jwtHelper.isTokenExpired(token);
  }
}
