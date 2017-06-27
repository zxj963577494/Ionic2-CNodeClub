import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { Badge } from '@ionic-native/badge';

import { UtilService } from "../../service/util.service";
import { MessageService } from "../../service/message.service";
import { HomeDetailPage } from '../../pages/home/home-detail';
import { UserPage } from '../../pages/user/user';

@IonicPage()
@Component({
  selector: 'page-account-messages',
  templateUrl: 'account-messages.html',
})
export class AccountMessagesPage implements OnInit {
  myMessages: any[];
  messageParams: any;
  hasNotMessageCount: number;
  hasMessageCount: number;
  user: any;

  constructor(private navCtrl: NavController, private navParams: NavParams, private events: Events, private badge: Badge, private messageService: MessageService, private utilService: UtilService) {
    this.messageParams = {
      mdrender: true,
      accesstoken: ''
    }
  }

  getMessages() {
    this.messageParams.accesstoken = this.user.accesstoken
    this.messageService.GetMessages(this.messageParams).subscribe(
      (data) => {
        this.myMessages = data.data
        this.hasNotMessageCount = data.data.hasnot_read_messages.length;
        this.hasMessageCount = data.data.has_read_messages.length;
      }
    )
  }

  openTopic(id: string) {
    this.navCtrl.push(HomeDetailPage, { id: id });
  }

  openUser(loginname: string) {
    this.navCtrl.push(UserPage, { loginname: loginname });
  }

  markOne(message: any) {
    this.messageService.PutMessageMarkOne(message.id, { accesstoken: this.user.accesstoken }).subscribe(
      data => {
        if (data.success) {
          this.myMessages = this.myMessages.filter(item => item !== message);
          this.events.publish('messageCount', this.hasNotMessageCount - 1);
          this.badge.set(this.hasNotMessageCount - 1).then().catch(error => console.log(error));
          this.utilService.toast('操作成功');
        }
      });
  }

  markAll() {
    this.messageService.PutMessageMarkAll({ accesstoken: this.user.accesstoken }).subscribe(
      data => {
        if (data.success) {
          this.events.publish('messageCount', 0);
          this.badge.clear();
          this.utilService.toast('全部标记为已读成功');
        }
      });
  }

  ngOnInit() {
    this.utilService.getLoginStatus().then((data) => this.user = data).then(() => {
      if (this.user) {
        this.getMessages();
      } else {
        this.utilService.toast('请登录');
      }
    })
  }
}
