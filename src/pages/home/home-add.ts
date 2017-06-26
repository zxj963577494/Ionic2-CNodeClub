import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

import { TopicService } from '../../service/topic.service';
import { UtilService } from '../../service/util.service';

@IonicPage()
@Component({
  selector: 'page-home-add',
  templateUrl: 'home-add.html',
})
export class HomeAddPage implements OnInit {
  topicParams: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, private topicService: TopicService, private utilService: UtilService) {
    this.topicParams = {
      accesstoken: '',
      tab: '',
      title: '',
      content: ''
    }
  }

  submit() {
    this.topicService.PostTopics(this.topicParams).subscribe(
      data => {
        if (data.data.successs) {
          this.utilService.toast('发布成功');
        }
        else {
          this.utilService.toast('发布失败');
        }
        this.viewCtrl.dismiss();
      }
    )
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  ngOnInit() {
    this.utilService.getLoginStatus().then((logined) => {
      if (logined) {
        this.topicParams.accesstoken = logined.accesstoken;
      }
      else {
        this.utilService.toast('请登录');
      }
    });
  }
}
