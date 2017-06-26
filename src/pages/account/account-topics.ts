import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

import { HomeDetailPage } from './../home/home-detail';
import { UtilService } from "../../service/util.service";
import { UserService } from '../../service/user.service';

@IonicPage()
@Component({
  selector: 'page-account-topics',
  templateUrl: 'account-topics.html',
})
export class AccountTopicsPage implements OnInit {
  loginname: string;
  topicsCount: number;
  repliesCount: number;
  user: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, private userService: UserService, private utilService: UtilService) {
    this.user = {
      recent_topics: [],
      recent_replies: []
    };
  }

  getUser() {
    this.userService.getUser(this.loginname).subscribe(
      data => {
        this.user = data.data
        this.topicsCount = data.data.recent_topics.length
        this.repliesCount = data.data.recent_replies.length;
      }
    );
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  openPage(id: string) {
    this.viewCtrl.dismiss();
    this.navCtrl.push(HomeDetailPage, { id: id });
  }

  ngOnInit() {
    this.utilService.getLoginStatus().then((data) => this.loginname = data.loginname).then(() => {
      if (this.user) {
        this.getUser();
      } else {
        this.utilService.toast('请登录');
      }
    })
  }
}
