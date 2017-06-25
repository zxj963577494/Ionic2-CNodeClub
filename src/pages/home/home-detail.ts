import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { TopicService } from '../../service/topic.service';
import { CollectService } from '../../service/collect.service';
import { RepliesService } from '../../service/replies.service';

@IonicPage()
@Component({
  selector: 'page-home-detail',
  templateUrl: 'home-detail.html'
})
export class HomeDetailPage implements OnInit {
  id: string;
  topicParams: any;
  topic: any;
  accesstoken: string;
  replyParams: any;
  collectParams: any;
  local: any;
  isLogin: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, private toastCtrl: ToastController, private topicService: TopicService, private collectService: CollectService, private repliesService: RepliesService, private storage: Storage) {
    this.id = this.navParams.get('id');
    this.topic = {
      author: {
        loginname: '',
        avatar_url: ''
      },
      create_at: '',
      last_reply_at: '',
      content: '',
      visit_count: '',
      reply_count: '',
      replies: []
    }
    this.topicParams = {
      mdrender: true,
      accesstoken: ''
    }
    this.replyParams = {
      accesstoken: '',
      content: '',
      replyId: ''
    }
    this.collectParams = {
      accesstoken: '',
      topic_id: ''
    }
  }

  getLocal() {
    return this.storage.get('user').then((val) => {
      if (val) {
        this.local = val;
        this.accesstoken = val.accesstoken;
        this.isLogin = true;
      }
      else {
        this.isLogin = false;
      }
    });
  }

  getTopicDetail() {
    this.topicService.getTopicDetail(this.id, this.topicParams).subscribe(
      topic => this.topic = topic.data
    );
  }

  collect(topic_id: string) {
    if (this.isLogin) {
      this.collectParams.topic_id = topic_id;
      this.collectService.PostCollect(this.collectParams).subscribe(
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
    else {
      this.toastCtrl.create({
        message: '请登录后进行操作',
        duration: 1500,
        position: 'top'
      });
    }
  }

  replieUps(replyId: string) {
    if (this.isLogin) {
      this.repliesService.PutRepliesUps(replyId, { accesstoken: this.accesstoken }).subscribe(data => {
        if (data.success) {
          if (data.action === 'down') {
            this.toastCtrl.create({
              message: '点赞成功',
              duration: 1500,
              position: 'top'
            });
          }
          else {
            this.toastCtrl.create({
              message: '取消点赞成功',
              duration: 1500,
              position: 'top'
            });
          }
        }
        else {
          this.toastCtrl.create({
            message: '操作失败',
            duration: 1500,
            position: 'top'
          });
        }
      });
    } else {
      this.toastCtrl.create({
        message: '请登录后进行操作',
        duration: 1500,
        position: 'top'
      });
    }
  }

  reReply(replyId: string, loginname: string) {
    this.replyParams.content = '@' + loginname + ' ';
    this.replyParams.replyId = replyId;
  }

  saveReply() {
    if (this.isLogin) {
      if (this.replyParams.content.indexOf('@') < 0) {
        this.replyParams.reply_id = '';
      }
      this.repliesService.PostReplies(this.id, this.replyParams).subscribe((data) => {
        if (data.success) {
          let replie = {
            author: {
              loginname: this.local.loginname,
              avatar_url: this.local.avatar_url
            },
            content: '<div class=\"markdown-text\"><p>' + this.replyParams.content + '</p>\n</div>',
            id: data.reply_id
          };
          this.topic.replies.unshift(replie);
          this.toastCtrl.create({
            message: '回复成功',
            duration: 1500,
            position: 'top'
          });
          this.replyParams.content = '';
        }
      });
    } else {
      this.toastCtrl.create({
        message: '请登录后进行操作',
        duration: 1500,
        position: 'top'
      });
    }
  }

  ngOnInit() {
    this.getLocal().then(() => this.getTopicDetail());
  }
}