import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

import { UtilService } from "../../service/util.service";
import { CollectService } from "../../service/collect.service";

@IonicPage()
@Component({
  selector: 'page-account-collects',
  templateUrl: 'account-collects.html',
})
export class AccountCollectsPage implements OnInit {
  myCollects: any[];
  collectParams: any;
  user: any;
  collectCount: number;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, private collectService: CollectService, private utilService: UtilService) {
    this.collectParams = {
      topic_id: '',
      accesstoken: ''
    }
  }

  getCollects() {
    this.collectService.getCollects(this.user.loginname).subscribe(
      (data) => {
        this.myCollects = data.data;
        this.collectCount = data.data.length;
      }
    )
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  remove(topic: any) {
    this.collectParams.topic_id = topic.id;
    this.collectParams.accesstoken = this.user.accesstoken;
    this.collectService.DeleteCollect(this.collectParams).subscribe(
      data => {
        if (data.success) {
          this.myCollects = this.myCollects.filter(item => item !== topic);
          this.utilService.toast('移除成功');
        }
        else {
          this.utilService.toast('移除失败');
        }
      });
  }

  ngOnInit() {
    this.utilService.getLoginStatus().then((data) => this.user = data).then(() => {
      if (this.user) {
        this.getCollects();
      } else {
        this.utilService.toast('请登录');
      }
    })
  }
}
