import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { GetTopicsRequest, GetTopicDetailRequest, PostTopicsRequest, PutTopicsRequest } from '../message/topics.request';

@Injectable()
export class TopicService {

  private baseUrl: string = 'https://cnodejs.org/api/v1';

  constructor(private http: Http) { }

  getTopics(request: GetTopicsRequest): Observable<any> {
    return this.http.get(this.baseUrl + '/topics', { params: request })
      .map(res => res.json());
  }

  getTopicDetail(id: string, request: GetTopicDetailRequest): Observable<any> {
    return this.http.get(this.baseUrl + '/topic/' + id, { params: request })
      .map(res => res.json());
  }

  PostTopics(request: PostTopicsRequest): Observable<any> {
    return this.http.post(this.baseUrl + '/topics', request)
      .map(res => res.json());
  }

  PutTopics(request: PutTopicsRequest): Observable<any> {
    return this.http.post(this.baseUrl + '/topics/update', request)
      .map(res => res.json());
  }
}