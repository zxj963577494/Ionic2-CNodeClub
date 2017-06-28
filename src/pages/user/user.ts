import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { HomeDetailPage } from './../home/home-detail';
import { UserService } from '../../service/user.service';
import { UtilService } from '../../service/util.service';

@IonicPage()
@Component({
  selector: 'page-user',
  templateUrl: 'user.html',
})
export class UserPage implements OnInit {
  user: any;
  loginname: string;
  topicsCount: number;
  repliesCount: number;

  constructor(private navCtrl: NavController, private navParams: NavParams, private userService: UserService, private utilService: UtilService) {
    this.loginname = navParams.get('loginname');
    this.user = {
      avatar_url: '',
      loginname: '',
      score: '',
      create_at: '',
      recent_topics: [],
      recent_replies: []
    };
  }

  getUser() {
    this.userService.getUser(this.loginname).subscribe(
      data => {
        this.user = data.data;
        this.topicsCount = data.data.recent_topics.length
        this.repliesCount = data.data.recent_replies.length;
      }
    );
  }

  openPage(id: string) {
    this.navCtrl.push(HomeDetailPage, { id: id });
  }

  ngOnInit() {
    // 重要，移除下面这句话，通过href进入无法获取数据
    this.utilService.toast('加载中');
    this.getUser();
  }
}
