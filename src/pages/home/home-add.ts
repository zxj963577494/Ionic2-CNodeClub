import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { TopicService } from '../../service/topic.service';

@IonicPage()
@Component({
  selector: 'page-home-add',
  templateUrl: 'home-add.html',
})
export class HomeAddPage implements OnInit {
  topic: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private topicService: TopicService) {
    this.topic = {
      accesstoken: '', 
      tab: '',
      title: '',
      content: ''
    }
  }

  submit() {
    this.topicService.PostTopics(this.topic).subscribe(
      data => {
        
      }
    )
  }

  ngOnInit() {
  }
}
