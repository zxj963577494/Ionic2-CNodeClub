import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { PostRepliesRequest, PutRepliesUpsRequest } from '../message/replies.request';
import { CoreService } from './core.service';

@Injectable()
export class RepliesService {

  constructor(private http: Http, private coreService: CoreService) { }

  PostReplies(topic_id: string, request: PostRepliesRequest): Observable<any> {
    return this.http.post(this.coreService.baseUrl + '/topic/' + topic_id + '/replies', request)
      .map(res => res.json());
  } 
    
  PutRepliesUps(reply_id: string, request: PutRepliesUpsRequest): Observable<any> {
    return this.http.post(this.coreService.baseUrl + '/reply/' + reply_id + '/ups', request)
      .map(res => res.json()).catch(error => error.json());
  }
}