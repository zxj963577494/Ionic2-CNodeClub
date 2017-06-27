import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { GetMessageCountRequest, GetMessagesRequest, PutMessageMarkAllRequest, PutMessageMarkOneRequest } from '../message/message.request';
import { CoreService } from './core.service';

@Injectable()
export class MessageService {


  constructor(private http: Http, private coreService: CoreService) { }

  GetMessageCount(request: GetMessageCountRequest): Observable<any> {
    return this.http.get(this.coreService.baseUrl + '/message/count', { params: request })
      .map(res => res.json());
  }

  GetMessages(request: GetMessagesRequest): Observable<any> {
    return this.http.get(this.coreService.baseUrl + '/messages', { params: request })
      .map(res => res.json());
  }

  PutMessageMarkAll(request: PutMessageMarkAllRequest): Observable<any> {
    return this.http.post(this.coreService.baseUrl + '/message/mark_all', request)
      .map(res => res.json());
  }

  PutMessageMarkOne(msg_id: string, request: PutMessageMarkOneRequest): Observable<any> {
    return this.http.post(this.coreService.baseUrl + '/message/mark_one/' + msg_id, request)
      .map(res => res.json());
  }
}