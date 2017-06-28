import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { AppVersion } from '@ionic-native/app-version';
import { Badge } from '@ionic-native/badge';
import { Storage } from '@ionic/storage';

import { UserService } from '../../service/user.service';
import { UtilService } from '../../service/util.service';
import { MessageService } from '../../service/message.service';
import { AccountCollectsPage } from '../account';
import { AccountMessagesPage } from '../account';
import { AccountTopicsPage } from '../account';
import { LoginPage } from '../login/login';

@IonicPage()
@Component({
  selector: 'page-account',
  templateUrl: 'account.html',
})
export class AccountPage implements OnInit {
  versionNumber: string;
  user: any;
  messageCount: string;

  constructor(private navCtrl: NavController, private navParams: NavParams, private events: Events, private appVersion: AppVersion, private badge: Badge, private storage: Storage, private userService: UserService, private utilService: UtilService, private messageService: MessageService) {
    this.user = {
      avatar_url: '',
      loginname: '',
      score: '',
      create_at: '',
    };
    events.subscribe('messageCount', (data) => {
      this.messageCount = data;
    });
    this.versionNumber = '请在手机中运行';
    this.appVersion.getVersionNumber().then((data) => {
      this.versionNumber = data
    }).catch((error) => console.log(error));
  }

  getUser() {
    this.userService.getUser(this.user.loginname).subscribe(
      data => this.user = data.data
    );
  }

  getMesssge() {
    this.messageService.GetMessageCount({ accesstoken: this.user.accesstoken }).subscribe(data => {
      this.messageCount = data.data;
      this.events.publish('messageCount', data.data);
      this.badge.set(data.data).then().catch(error => console.log(error));
    })
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

  loginOut() {
    this.events.publish('messageCount', 0);
    this.storage.clear();
    this.badge.clear().then().catch(error => console.log(error));
    this.navCtrl.pop();
  }

  ngOnInit() {
    this.utilService.getLoginStatus().then((data) => {
      this.user = data;
    }).then(() => {
      if (this.user) {
        this.getMesssge();
      }
      else {
        return this.navCtrl.push(LoginPage);
      }
    }).then(() => this.getUser());
  }
}
