import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'link'
})

export class LinkPipe implements PipeTransform {

  constructor(private sanitize:DomSanitizer) { }

  transform(value: any, ...args: any[]): any {
    if (value && typeof value === 'string') {
        const topicFullLinkRegex = /href="([\S]+)\/topic\/([\S]+)"/gi;
        const userFullLinkRegex = /href="([\S]+)\/user\/([\S]+)"/gi;
        const userLinkRegex = /href="\/user\/([\S]+)"/gi;
        const noProtocolSrcRegex = /src="\/\/([\S]+)"/gi;
        const externalLinkRegex = /href="((?!#\/(user|home)\/))([\S]+)"/gi;
        let ret = value
            .replace(topicFullLinkRegex, 'href="#/home/$2"')
            .replace(userFullLinkRegex, 'href="#/user/$2"')
            .replace(userLinkRegex, 'href="#/user/$1"')
            .replace(noProtocolSrcRegex, 'src="https://$1"')
            .replace(externalLinkRegex, "onClick=\"window.open('$3', '_blank', 'location=no')\"")
        return this.sanitize.bypassSecurityTrustHtml(ret);
      }
  }
}