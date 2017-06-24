import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { GetMessageCountRequest, GetMessagesRequest, PutMessageMarkAllRequest, PutMessageMarkOneRequest } from '../message/message.request';

@Injectable()
export class MessageService {
  private baseUrl: string = 'https://cnodejs.org/api/v1';

  constructor(private http: Http) { }

  GetMessageCount(request: GetMessageCountRequest): Observable<any> {
    return this.http.get(this.baseUrl + '/message/count', { params: request })
      .map(res => res.json());
  }

  GetMessages(request: GetMessagesRequest): Observable<any> {
    return this.http.get(this.baseUrl + '/messages', { params: request })
      .map(res => res.json());
  }

  PutMessageMarkAll(request: PutMessageMarkAllRequest): Observable<any> {
    return this.http.post(this.baseUrl + '/message/mark_all', request)
      .map(res => res.json());
  }

  PutMessageMarkOne(msg_id: string, request: PutMessageMarkOneRequest): Observable<any> {
    return this.http.post(this.baseUrl + '/message/mark_one/' + msg_id, request)
      .map(res => res.json());
  }
}