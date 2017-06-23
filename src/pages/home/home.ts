import { TopicService } from './../../service/topic.service';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  constructor(public navCtrl: NavController, private topicService: TopicService) {

  }
  
  GetTopics() {
    let params = {
      accesstoken: '',
      mdrender: false
    }
    this.topicService.getTopicDetail('5433d5e4e737cbe96dcef312', params)
                     .subscribe(
                       data => console.log(data)
                     );
  }
}
