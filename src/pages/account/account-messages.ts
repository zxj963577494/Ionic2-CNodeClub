import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

import { UtilService } from "../../service/util.service";
import { MessageService } from "../../service/message.service";

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

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, private messageService: MessageService, private utilService: UtilService) {
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

  dismiss() {
    this.viewCtrl.dismiss();
  }

  markOne(msg_id: string) {
    this.messageService.PutMessageMarkOne(msg_id, { accesstoken: this.user.accesstoken }).subscribe(
      data => {
        if (data.success) {
          this.utilService.toast('操作成功');
        }
      });
  }

  markAll() {
    this.messageService.PutMessageMarkAll({ accesstoken: this.user.accesstoken }).subscribe(
      data => {
        if (data.success) {
          this.utilService.toast('操作成功');
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
