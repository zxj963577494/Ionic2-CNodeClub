import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';

import { TopicService } from '../../service/topic.service';
import { UtilService } from '../../service/util.service';

@IonicPage()
@Component({
  selector: 'page-home-add',
  templateUrl: 'home-add.html',
})
export class HomeAddPage implements OnInit {
  topicParams: any;
  user: any;

  constructor(private navCtrl: NavController, private navParams: NavParams, private events: Events, private topicService: TopicService, private utilService: UtilService) {
    this.topicParams = {
      accesstoken: '',
      tab: '',
      title: '',
      content: ''
    }
  }

  onSubmit() {
    this.topicService.PostTopics(this.topicParams).subscribe(
      data => {
        if (data.success) {
          this.utilService.toast('发布成功');
          this.events.publish('topicPush', {
            id: data.topic_id,
            title: this.topicParams.title,
            author: {
              avatar_url: this.user.avatar_url,
              loginname: this.user.loginname
            },
            last_reply_at: new Date()
          });
        }
        else {
          this.utilService.toast('发布失败');
        }
      }
    )
  }
  
  ngOnInit() {
    this.utilService.getLoginStatus().then((data) => {
      if (data) {
        this.user = data;
        this.topicParams.accesstoken = data.accesstoken;
      }
      else {
        this.utilService.toast('请登录');
      }
    });
  }
}
