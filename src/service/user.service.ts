import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { PostAccessTokenRequest } from '../message/user.request';
import { CoreService } from './core.service';

@Injectable()
export class UserService {

  constructor(private http: Http, private coreService: CoreService) { }

  getUser(loginname: string): Observable<any> {
    return this.http.get(this.coreService.baseUrl + '/user/' + loginname)
      .map(res => res.json());
  }

  PostAccessToken(request: PostAccessTokenRequest): Observable<any> {
    return this.http.post(this.coreService.baseUrl + '/accesstoken', request)
      .map(res => res.json());
  }
}