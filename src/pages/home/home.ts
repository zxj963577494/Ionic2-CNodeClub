import { Component, OnInit } from '@angular/core';
import { App, NavController, NavParams } from 'ionic-angular';

import { TopicService } from '../../service/topic.service';
import { HomeDetailPage } from './home-detail';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {
  tab: string;
  topics: any[];
  params: any;

  constructor(public appCtrl: App, public navCtrl: NavController, public navParams: NavParams, private topicService: TopicService) {
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

  ngOnInit() {
    this.navCtrl.pop();
    this.GetTopics();
  }
}
