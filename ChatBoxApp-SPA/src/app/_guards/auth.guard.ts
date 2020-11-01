import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router,
    private alertifyService: AlertifyService)
    {}

  canActivate(): boolean {
    if (this.authService.loggedIn()) {
      return true;
    } else {
      this.alertifyService.error('You need to login to access this section !!!');
      this.router.navigate(['/home']);
      return false;
    }
  }
}
