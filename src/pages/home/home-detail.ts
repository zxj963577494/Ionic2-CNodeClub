import { Component, OnInit } from '@angular/core';
import { App, NavController, NavParams } from 'ionic-angular';

import { TopicService } from '../../service/topic.service';

@Component({
  selector: 'page-home-detail',
  templateUrl: 'home-detail.html'
})
export class HomeDetailPage implements OnInit {
  name: string;
  id: string;
  params: any;
  topic: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private topicService: TopicService) { 
    this.id = this.navParams.get('id');
    this.params = {
      mdrender: false,
      accesstoken: ''
    }
  }

  getTopicDetail() {
    this.topicService.getTopicDetail(this.id, this.params).subscribe(
      topic => this.topic = topic.data
    );
  }

  collect() {
    
  }

  ngOnInit() { 
    this.getTopicDetail();
  }
}