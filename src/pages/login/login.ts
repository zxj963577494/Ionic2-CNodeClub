import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ViewController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { AppVersion } from '@ionic-native/app-version';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';

import { UserService } from '../../service/user.service';
import { AccountPage } from '../account/account';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage implements OnInit {
  versionNumber: string;
  user: {
    loginname: string,
    avatar_url: string,
    accesstoken: string
  }

  constructor(private navCtrl: NavController, private navParams: NavParams, private alertCtrl: AlertController, private viewCtrl: ViewController, private storage: Storage, private appVersion: AppVersion, private barcodeScanner: BarcodeScanner, private userService: UserService) {
    let alert = alertCtrl.create({
      title: '扫码登录',
      message: 'PC登录 https://cnodejs.org/setting 后，扫描设置页面的Access Token二维码即可完成登录',
      buttons: [
        {
          text: '我知道了',
          handler: () => {
            this.barcodeScanner.scan().then((barcodeData) => {
              this.user = {
                loginname: '',
                avatar_url: '',
                accesstoken: ''
              }
              this.user.accesstoken = barcodeData.text;
              this.userService.PostAccessToken({ accesstoken: this.user.accesstoken }).subscribe((data) => {
                this.user.loginname = data.loginname;
                this.user.avatar_url = data.avatar_url;
                this.navCtrl.push(AccountPage).then(() => {
                  let index = this.viewCtrl.index;
                  this.navCtrl.remove(index);
                });
              })
            }, (err) => {
              console.log(err);
            }).catch((error) => console.log(error));
          }
        }
      ]
    });
    alert.present();
    this.versionNumber = '请在手机中运行';
    this.appVersion.getVersionNumber().then((data) => {
      this.versionNumber = data
    }).catch((error) => console.log(error));
  }

  login() {
    this.storage.set('user', this.user);
  }

  ngOnInit() {
  }
}
