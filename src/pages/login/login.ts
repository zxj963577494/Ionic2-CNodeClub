import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ViewController, Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { AppVersion } from '@ionic-native/app-version';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';

import { UserService } from '../../service/user.service';
import { AccountPage } from '../account/account';
import { UtilService } from '../../service/util.service';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage implements OnInit {
  versionNumber: string;
  user: any;

  constructor(private navCtrl: NavController, private navParams: NavParams, private alertCtrl: AlertController, private viewCtrl: ViewController, private storage: Storage, private events: Events, private appVersion: AppVersion, private barcodeScanner: BarcodeScanner, private userService: UserService, private utilService: UtilService) {
    this.user = {
      loginname: '',
      avatar_url: '',
      accesstoken: ''
    }
    this.appVersion.getVersionNumber().then((data) => {
      this.versionNumber = data
    }).catch((error) => {
      console.log(error);
      this.versionNumber = '请在手机中运行';
    });
  }

  login() {
    let alert = this.alertCtrl.create({
      title: '扫码登录',
      message: 'PC登录 https://cnodejs.org/setting 后，扫描设置页面的Access Token二维码即可完成登录',
      buttons: [
        {
          text: '我知道了',
          handler: () => {
            this.barcodeScanner.scan().then((barcodeData) => {
              this.user.accesstoken = barcodeData.text;
              this.userService.PostAccessToken({ accesstoken: this.user.accesstoken }).subscribe((data) => {
                if (data.success) {
                  this.user.loginname = data.loginname;
                  this.user.avatar_url = data.avatar_url;
                  this.events.publish('user', this.user);
                  this.storage.set('user', this.user);
                  this.navCtrl.push(AccountPage).then(() => {
                    let index = this.viewCtrl.index;
                    this.navCtrl.remove(index);
                  });
                  this.utilService.toast('登录成功');
                }
                else {
                  this.utilService.toast('登录失败');
                }
              })
            }, (err) => {
              this.alertCtrl.create({
                title: '注意',
                message: '在非手机设备(浏览器)时登录，需填入相关用户信息，必填！',
                inputs: [
                  {
                    name: 'loginname',
                    placeholder: '用户名'
                  },
                  {
                    name: 'avatar_url',
                    placeholder: '头像URL',
                  },
                  {
                    name: 'accesstoken',
                    placeholder: 'accesstoken',
                  }
                ],
                buttons: [
                  {
                    text: '取消',
                    role: 'cancel',
                    handler: data => {
                    }
                  },
                  {
                    text: '登录',
                    handler: data => {
                      if (data.loginname && data.avatar_url && data.accesstoken) {
                        this.user.loginname = data.loginname;
                        this.user.avatar_url = data.avatar_url;
                        this.user.accesstoken = data.accesstoken;
                        this.events.publish('user', this.user);
                        this.storage.set('user', this.user);
                        this.navCtrl.push(AccountPage).then(() => {
                          let index = this.viewCtrl.index;
                          this.navCtrl.remove(index);
                        });
                      } else {
                        return false;
                      }
                    }
                  }
                ]
              }).present();
              console.log(err);
            });
          }
        }
      ]
    });
    alert.present();
  }

  ionViewCanEnter() {
    this.utilService.getLoginStatus().then((data) => {
      if (data) {
        this.navCtrl.push(AccountPage).then(() => {
          let index = this.viewCtrl.index;
          this.navCtrl.remove(index);
        });
      }
    })
  }

  ngOnInit() {

  }
}
