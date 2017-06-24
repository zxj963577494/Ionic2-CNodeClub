import { Component, OnInit } from '@angular/core';
import { App, NavController, NavParams, ToastController } from 'ionic-angular';

import { TopicService } from '../../service/topic.service';
import { CollectService } from '../../service/collect.service';

@Component({
  selector: 'page-home-detail',
  templateUrl: 'home-detail.html'
})
export class HomeDetailPage implements OnInit {
  name: string;
  id: string;
  params: any;
  topic: any;
  accesstoken: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private toastCtrl: ToastController, private topicService: TopicService, private collectService: CollectService) {
    this.id = this.navParams.get('id');
    this.params = {
      mdrender: true,
      accesstoken: ''
    }
  }

  getTopicDetail() {
    this.topicService.getTopicDetail(this.id, this.params).subscribe(
      topic => this.topic = topic.data
    );
  }

  collect(topic_id: string) {
    this.collectService.PostCollect({ accesstoken: this.accesstoken, topic_id: topic_id }).subscribe(
      data => {
        if (data.success) {
          this.toastCtrl.create({
            message: '收藏成功',
            duration: 1500,
            position: 'top'
          });
        }
        else {
          this.toastCtrl.create({
            message: '收藏失败或已经收藏',
            duration: 1500,
            position: 'top'
          });
        }
      });
  }

  ngOnInit() {
    this.getTopicDetail();
  }
}