import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { PostCollectRequest, DeleteCollectRequest } from '../message/collect.request';

@Injectable()
export class CollectService {
  private baseUrl: string = 'https://cnodejs.org/api/v1';

  constructor(private http: Http) { }

  PostCollect(request: PostCollectRequest): Observable<any> {
    return this.http.post(this.baseUrl + '/topic_collect/collect', request)
      .map(res => res.json());
  }

  DeleteCollect(request: DeleteCollectRequest): Observable<any> {
    return this.http.post(this.baseUrl + '/topic_collect/de_collect', request)
      .map(res => res.json());
  }

  getCollects(loginname: string): Observable<any[]> {
    return this.http.get(this.baseUrl + '/topics/' + loginname)
      .map(res => res.json());
  }

}