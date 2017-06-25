import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { UserService } from '../../service/user.service';

@IonicPage()
@Component({
  selector: 'page-account',
  templateUrl: 'account.html',
})
export class AccountPage implements OnInit {
  user: any;
  loginname: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage, private userService: UserService) {
    this.user = {
      avatar_url: '',
      loginname: '',
      score: '',
      create_at: '',
    };
  }

  getUser() {
    this.userService.getUser(this.loginname).subscribe(
      data => this.user = data.data
    );
  }

  getLocal() {
    return this.storage.get('user').then((val) => {
      if (val) {
        this.loginname = val.loginname;
      }
    });
  }

  ngOnInit() {
    this.getLocal().then(() => this.getUser());
  }
}
