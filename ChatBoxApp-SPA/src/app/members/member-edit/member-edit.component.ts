import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { User } from 'src/app/_models/user';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { AuthService } from 'src/app/_services/auth.service';
import { UserService } from 'src/app/_services/user.service';


@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.scss']
})
export class MemberEditComponent implements OnInit {
  @ViewChild('editForm') editForm: NgForm;
  user: User;
  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any) {
    if (this.editForm.dirty) {
      $event.returnValue = true;
    }
  }

  constructor(private route: ActivatedRoute,
              private alertifyService: AlertifyService,
              private userService: UserService,
              private authSerivce: AuthService) { }

  ngOnInit(): void {
    this.route.data.subscribe( data => {
      this.user = data['user'];
    });
  }

  updateUser() {
    this.userService.updateUser(this.authSerivce.decodedToken.nameid, this.user).subscribe(next => {
      this.alertifyService.success('Profile updated successfully');
      this.editForm.reset(this.user);
    }, error => {
      this.alertifyService.error(error);
    });
  }
}
