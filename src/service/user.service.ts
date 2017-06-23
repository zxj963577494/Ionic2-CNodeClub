import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { PostAccessTokenRequest } from '../message/user.request';

@Injectable()
export class UserService {
  private baseUrl: string = 'https://cnodejs.org/api/v1';

  constructor(private http: Http) { }

  getCollects(loginname: string): Observable<any[]> {
    return this.http.get(this.baseUrl + '/user/' + loginname)
      .map(res => res.json());
  }

  PostAccessToken(topic_id: string, request: PostAccessTokenRequest): Observable<any> {
    return this.http.post(this.baseUrl + '/accesstoken', request)
      .map(res => res.json());
  }
}