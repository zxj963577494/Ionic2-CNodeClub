import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { PostCollectRequest, DeleteCollectRequest } from '../message/collect.request';
import { CoreService } from './core.service';

@Injectable()
export class CollectService {

  constructor(private http: Http, private coreService: CoreService) { }

  PostCollect(request: PostCollectRequest): Observable<any> {
    return this.http.post(this.coreService.baseUrl + '/topic_collect/collect', request)
      .map(res => res.json());
  }

  DeleteCollect(request: DeleteCollectRequest): Observable<any> {
    return this.http.post(this.coreService.baseUrl + '/topic_collect/de_collect', request)
      .map(res => res.json());
  }

  getCollects(loginname: string): Observable<any> {
    return this.http.get(this.coreService.baseUrl + '/topic_collect/' + loginname)
      .map(res => res.json());
  }

}