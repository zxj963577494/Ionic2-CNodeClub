import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'link'
})

export class LinkPipe implements PipeTransform {
  transform(value: any, ...args: any[]): any {
    if (typeof value === 'string') {
        var topicFullLinkRegex = /href="([\S]+)\/topic\/([\S]+)"/gi;
        var userFullLinkRegex = /href="([\S]+)\/user\/([\S]+)"/gi;
        var userLinkRegex = /href="\/user\/([\S]+)"/gi;
        var noProtocolSrcRegex = /src="\/\/([\S]+)"/gi;
        var externalLinkRegex = /href="((?!#\/user\/))[\S]+"/gi;
        return value
            .replace(topicFullLinkRegex, 'href="#/home/$2"')
            .replace(userFullLinkRegex, 'href="#/user/$2"')
            .replace(userLinkRegex, 'href="#/user/$1"')
            .replace(noProtocolSrcRegex, 'src="https://$1"')
            .replace(externalLinkRegex, "onClick=\"open('$1', '_blank', 'location=no')\"")
      }
  }
}