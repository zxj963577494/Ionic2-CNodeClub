import { Injectable } from '@angular/core';
import { ToastController, ModalController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@Injectable()
export class UtilService {

  constructor(public toastCtrl: ToastController, public modalCtrl: ModalController, private storage: Storage) { }

  getTabs(): Array<{ key: string, value: string, icon: string }> {
    return [{
      key: 'all',
      value: '全部',
      icon: 'home'
    },
    {
      key: 'good',
      value: '精华',
      icon: 'star'
    },
    {
      key: 'share',
      value: '分享',
      icon: 'share'
    },
    {
      key: 'ask',
      value: '问答',
      icon: 'chatbubbles'
    },
    {
      key: 'job',
      value: '招聘',
      icon: 'briefcase'
    },
    {
      key: 'dev',
      value: '客户端测试',
      icon: 'bug'
    }]
  }

  toast(message: string) {
    this.toastCtrl.create({
      message: message,
      duration: 1500,
      position: 'top'
    }).present();
  }

  modal(page: any) {
    this.modalCtrl.create(page).present();
  }

  getLoginStatus() {
    return this.storage.get('user').then((val) => {
      return val;
    })
  }
}