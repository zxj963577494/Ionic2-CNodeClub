import { Injectable } from '@angular/core';

@Injectable()
export class CoreService {

  constructor() { }

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
}