import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: any = {};
  mainPhotoUrl: string;

  constructor(public authService: AuthService, private alertifyService: AlertifyService,
    private router: Router) { }

  ngOnInit() {
    this.authService.currentMainPhotoUrl.subscribe(photoUrl => this.mainPhotoUrl = photoUrl);
  }

  login() {
    console.log(this.model);
    this.authService.login(this.model).subscribe( next => {
      this.alertifyService.success('successfully logged in');
    }, error => {
      this.alertifyService.error(error);
    }, () => {
      this.router.navigate(['/members']);
    });
  }

  loggedIn() {
    return this.authService.loggedIn();
  }

  loggedOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('userData');
    this.authService.decodedToken = null;
    this.authService.currentUser = null;
    this.alertifyService.message('User successfully logged out.');
    this.router.navigate(['/home']);
  }

}
