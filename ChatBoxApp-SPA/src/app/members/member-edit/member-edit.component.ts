import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { User } from 'src/app/_models/user';
import { AlertifyService } from 'src/app/_services/alertify.service';


@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.scss']
})
export class MemberEditComponent implements OnInit {
  @ViewChild('editForm') editForm: NgForm;
  user: User;

  constructor(private route: ActivatedRoute, private alertifyService: AlertifyService) { }

  ngOnInit(): void {
    this.route.data.subscribe( data => {
      this.user = data['user'];
    });
  }

  updateUser() {
    this.alertifyService.success('Profile updated successfully');
    this.editForm.reset(this.user);
  }

}
