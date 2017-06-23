import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { PostRepliesRequest, PutRepliesUpsRequest } from '../message/replies.request';

@Injectable()
export class RepliesService {
  private baseUrl: string = 'https://cnodejs.org/api/v1';

  constructor(private http: Http) { }

  PostReplies(topic_id: string, request: PostRepliesRequest): Observable<any> {
    return this.http.post(this.baseUrl + '/topic/' + topic_id + '/replies', request)
      .map(res => res.json());
  } 
    
  PutRepliesUps(reply_id: string, request: PutRepliesUpsRequest): Observable<any> {
    return this.http.post(this.baseUrl + '/reply/' + reply_id + '/ups', request)
      .map(res => res.json());
  }
}