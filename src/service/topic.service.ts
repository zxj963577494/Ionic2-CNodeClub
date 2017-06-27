import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { GetTopicsRequest, GetTopicDetailRequest, PostTopicsRequest, PutTopicsRequest } from '../message/topics.request';
import { CoreService } from './core.service';

@Injectable()
export class TopicService {

  constructor(private http: Http, private coreService: CoreService) { }

  getTopics(request: GetTopicsRequest): Observable<any> {
    return this.http.get(this.coreService.baseUrl + '/topics', { params: request })
      .map(res => res.json());
  }

  getTopicDetail(id: string, request: GetTopicDetailRequest): Observable<any> {
    return this.http.get(this.coreService.baseUrl + '/topic/' + id, { params: request })
      .map(res => res.json());
  }

  PostTopics(request: PostTopicsRequest): Observable<any> {
    return this.http.post(this.coreService.baseUrl + '/topics', request)
      .map(res => res.json());
  }

  PutTopics(request: PutTopicsRequest): Observable<any> {
    return this.http.post(this.coreService.baseUrl + '/topics/update', request)
      .map(res => res.json());
  }
}