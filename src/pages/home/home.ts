import { Component, OnInit } from '@angular/core';
import { App, IonicPage, NavController, NavParams } from 'ionic-angular';


import { TopicService } from '../../service/topic.service';
import { UtilService } from '../../service/util.service';
import { HomeDetailPage } from './home-detail';
import { LoginPage } from '../login/login';
import { AccountPage } from '../account/account';
import { HomeAddPage } from './home-add';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {
  tab: string;
  topics: any[];
  params: any;
  isLogin: boolean;

  constructor(public appCtrl: App, public navCtrl: NavController, public navParams: NavParams, private topicService: TopicService, private utilService: UtilService) {
    this.tab = this.navParams.get('tab');
    this.params = {
      page: 1,
      tab: this.tab || 'all',
      limit: 20,
      mdrender: false
    }
  }

  GetTopics() {
    this.topicService.getTopics(this.params).subscribe(
      data => this.topics = data.data
    );
  }

  doRefresh(refresher) {
    this.params.page = 1;
    setTimeout(() => {
      this.topicService.getTopics(this.params).subscribe(
        data => {
          this.topics = data.data;
          refresher.complete();
        }
      );
    }, 2000);
  }

  doInfinite(infiniteScroll) {
    this.params.page++;
    setTimeout(() => {
      this.topicService.getTopics(this.params).subscribe(
        data => {
          if (data) {
            this.topics.push(...data.data);
            infiniteScroll.complete();
          }
          else {
            infiniteScroll.enable(false);
          }
        }
      );
    }, 500);
  }

  openPage(id: string) {
    this.appCtrl.getRootNav().push(HomeDetailPage, { id: id });
  }

  login() {
    if (this.isLogin) {
      this.appCtrl.getRootNav().push(AccountPage);
    }
    else {
      this.appCtrl.getRootNav().push(LoginPage);
    }
  }

  addTopic() {
    if (this.isLogin) {
      this.utilService.modal(HomeAddPage);
    }
    else {
      this.utilService.toast('请登录后发帖');
    }
  }

  ngOnInit() {
    this.utilService.getLoginStatus().then((logined) => this.isLogin = logined ? true : false).then(() => this.GetTopics());
  }
}
