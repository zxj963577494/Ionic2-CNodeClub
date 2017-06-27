import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';

import { UserService } from '../../service/user.service';
import { UtilService } from '../../service/util.service';
import { MessageService } from '../../service/message.service';
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
  messageCount: string;

  constructor(private navCtrl: NavController, private navParams: NavParams, private events: Events, private userService: UserService, private utilService: UtilService, private messageService: MessageService) {
    this.user = {
      avatar_url: '',
      loginname: '',
      score: '',
      create_at: '',
    };
    events.subscribe('messageCount', (data) => {
      this.messageCount = data;
    });
  }

  getUser() {
    this.userService.getUser(this.user.loginname).subscribe(
      data => this.user = data.data
    );
  }

  getMesssge() {
    this.messageService.GetMessageCount({ accesstoken: this.user.accesstoken }).subscribe(data => this.messageCount = data.data)
  }

  openPage(cate: string) {
    if (cate === 'collects') {
      this.navCtrl.push(AccountCollectsPage);
    }
    else if (cate === 'messages') {
      this.navCtrl.push(AccountMessagesPage);
    }
    else {
      this.navCtrl.push(AccountTopicsPage);
    }
  }

  ngOnInit() {
    this.utilService.getLoginStatus().then((data) => {
      this.user = data;
    }).then(() => {
      this.getMesssge();
    }).then(() => this.getUser());
  }
}
