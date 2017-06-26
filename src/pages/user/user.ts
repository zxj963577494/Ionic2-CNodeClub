import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { HomeDetailPage } from './../home/home-detail';
import { UserService } from '../../service/user.service';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, private userService: UserService) {
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
    this.getUser();
  }
}
