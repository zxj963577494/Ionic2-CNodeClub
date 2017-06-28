import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'amAgoTime'
})

export class AmAgoTimePipe implements PipeTransform {
  transform(value: any, ...args: any[]): any {
    if (value) {
      return this.getDateDiff(value);
    }
  }

  getDateDiff(pTime: string) {
    const minute: number = 1000 * 60;
    const hour: number = minute * 60;
    const day: number = hour * 24;
    const month: number = day * 30;
    const year: number = day * 365;
    const now = new Date().getTime();
    const old = new Date(pTime).getTime();
    const diffValue = now - old;
    const yearC = diffValue / year;
    const monthC = diffValue / month;
    const weekC = diffValue / (7 * day);
    const dayC = diffValue / day;
    const hourC = diffValue / hour;
    const minC = diffValue / minute;
    if (yearC >= 1) {
      return Math.round(monthC) + "年前";
    }
    else if (monthC >= 1) {
      return Math.round(monthC) + "个月前";
    }
    else if (weekC >= 1) {
      return Math.round(weekC) + "周前";
    }
    else if (dayC >= 1) {
      return Math.round(dayC) + "天前";
    }
    else if (hourC >= 1) {
      return Math.round(hourC) + "小时前";
    }
    else if (minC >= 1) {
      return Math.round(minC) + "分钟前";
    } else {
      return "刚刚";
    }
  }
}