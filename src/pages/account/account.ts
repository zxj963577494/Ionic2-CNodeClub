import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { UserService } from '../../service/user.service';
import { UtilService } from '../../service/util.service';
import { AccountCollectsPage } from '../account';
import { AccountMessagesPage } from '../account';
import { AccountTopicsPage } from '../account';

@IonicPage()
@Component({
  selector: 'page-account',
  templateUrl: 'account.html',
})
export class AccountPage implements OnInit {
  user: any;
  loginname: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private userService: UserService, private utilService: UtilService) {
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

  openPage(cate: string) {
    if (cate === 'collects') {
      this.utilService.modal(AccountCollectsPage);
    }
    else if (cate === 'messages') {
      this.utilService.modal(AccountMessagesPage);
    }
    else {
      this.utilService.modal(AccountTopicsPage);
    }
  }

  ngOnInit() {
    this.utilService.getLoginStatus().then((logined) => this.loginname = logined.loginname).then(() => this.getUser());
  }
}
