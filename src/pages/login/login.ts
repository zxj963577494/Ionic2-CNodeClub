import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

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
    avatar_url: string
  }

  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage) {
    this.user = {
      id: 'fab02782-df19-425e-9158-224614dd928a',
      loginname: 'zxj963577494',
      avatar_url: 'https://avatars1.githubusercontent.com/u/6766515?v=3&s=120'
    }
  }

  login() {
    this.storage.set('user', this.user);
  }

  ngOnInit() {
  }
}
