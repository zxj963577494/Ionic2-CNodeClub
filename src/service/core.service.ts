import { Injectable } from '@angular/core';

@Injectable()
export class CoreService {

  constructor() { }

  public baseUrl: string = 'https://cnodejs.org/api/v1';
}