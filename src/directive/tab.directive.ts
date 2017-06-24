import { Directive, ElementRef, Input } from '@angular/core';

@Directive({ selector: '[tab]' })
export class TabDirective {
  @Input('tab') set topic(topic: any) {
    this.setStyle(topic);
  }

  private el: HTMLElement;
  private tabMaps: Array<{key: string, value: string}> = [
    {
      key: 'all',
      value: '全部',
    },
    {
      key: 'good',
      value: '精华',
    },
    {
      key: 'share',
      value: '分享',
    },
    {
      key: 'ask',
      value: '问答',
    },
    {
      key: 'job',
      value: '招聘',
    },
    {
      key: 'dev',
      value: '客户端测试',
    }]

  constructor(el: ElementRef) {
    this.el = el.nativeElement;
    this.setStyle(this.topic);
  }

  private setStyle(topic) {
    if (topic) {
      this.el.style.borderRadius = '4px';
      if (topic.top) {
        this.el.textContent = '置顶';
        this.el.style.background = '#f53d3d';
        this.el.style.color = '#fff';
      }
      else if (topic.good && !topic.top) {
        this.el.textContent = '精华';
        this.el.style.background = '#3374de';
        this.el.style.color = '#fff';
      }
      else {
        this.el.textContent = this.getValue(topic.tab);
        this.el.style.background = '#e5e5e5';
        this.el.style.color = '#999';
      }
    }
  }

  private getValue(key: string): string {
    for(let item of this.tabMaps) {
      if (item.key === key) {
        return item.value;
      }
    }
  }
}
