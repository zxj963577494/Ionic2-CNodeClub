import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ViewController } from 'ionic-angular';
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
  user: {
    id: string,
    loginname: string,
    avatar_url: string,
    accesstoken: string
  }

  constructor(private navCtrl: NavController, private navParams: NavParams, private alertCtrl: AlertController, private viewCtrl: ViewController, private storage: Storage, private appVersion: AppVersion, private barcodeScanner: BarcodeScanner, private userService: UserService, private utilService: UtilService) {
    this.user = {
      id: '',
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
              this.utilService.toast(barcodeData.text);
              this.userService.PostAccessToken({ accesstoken: this.user.accesstoken }).subscribe((data) => {
                if (data.success) {
                  this.user.id = data.id;
                  this.user.loginname = data.loginname;
                  this.user.avatar_url = data.avatar_url;
                  this.storage.set('user', this.user);
                  this.navCtrl.push(AccountPage).then(() => {
                    let index = this.viewCtrl.index;
                    this.navCtrl.remove(index);
                  });
                }
                else {
                  this.utilService.toast('登录失败');
                }
              })
            }, (err) => {
              this.user.id = '';
              this.user.loginname = 'zxj963577494';
              this.user.avatar_url = 'https://avatars1.githubusercontent.com/u/6766515?v=3&s=120';
              this.user.accesstoken = 'fab02782-df19-425e-9158-224614dd928a';
              this.storage.set('user', this.user);
              console.log(err);
            }).catch((error) => console.log(error));
          }
        }
      ]
    });
    alert.present();
  }

  ngOnInit() {
  }
}
