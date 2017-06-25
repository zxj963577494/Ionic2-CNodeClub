import { Component, OnInit } from '@angular/core';
import { App, IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';


import { TopicService } from '../../service/topic.service';
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

  constructor(public appCtrl: App, public navCtrl: NavController, public navParams: NavParams, private toastCtrl: ToastController, private topicService: TopicService, private storage: Storage) {
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
      topics => this.topics = topics.data
    );
  }

  doRefresh(refresher) {
    this.params.page = 1;
    setTimeout(() => {
      this.topicService.getTopics(this.params).subscribe(
        topics => {
          this.topics = topics.data;
          refresher.complete();
        }
      );
    }, 2000);
  }

  doInfinite(infiniteScroll) {
    this.params.page++;
    setTimeout(() => {
      this.topicService.getTopics(this.params).subscribe(
        topics => {
          if (topics) {
            this.topics.push(...topics.data);
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

  getLocal() {
    return this.storage.get('user').then((val) => {
      if (val) {
        this.isLogin = true;
      }
      else {
        this.isLogin = false;
      }
    })
  }

  addTopic() {
    if (this.isLogin) {
      this.appCtrl.getRootNav().push(HomeAddPage);
    }
    else {
      this.toastCtrl.create({
        message: '回复成功',
        duration: 1500,
        position: 'top'
      });
    }
  }

  ngOnInit() {
    this.getLocal().then(() => this.GetTopics());
  }
}
