import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { AppComponent } from './app.component';
import { HomePage, HomeDetailPage } from '../pages/home/';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TopicService, MessageService, RepliesService, UserService, CollectService, CoreService } from '../service/';

import { TabDirective } from "../directive/";
import { AmAgoTimePipe, LinkPipe } from '../pipe/'

@NgModule({
  declarations: [
    AppComponent,
    HomePage,
    HomeDetailPage,
    TabDirective,
    AmAgoTimePipe,
    LinkPipe
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(AppComponent, {
      backButtonText: '',
      backButtonIcon: 'ios-arrow-back',
      pageTransition: 'ios-transition'
    }, {
      links:[
        { component: HomePage, name: 'Home', segment: 'home' },
        { component: HomePage, name: 'Home', segment: 'home/:tab'},
        { component: HomeDetailPage, name: 'HomeDetail', segment: 'home/:id' },
        { component: HomeDetailPage, name: 'HomeDetail', segment: 'user/:loginname' },
        { component: HomeDetailPage, name: 'HomeDetail', segment: 'login/' },
        { component: HomeDetailPage, name: 'HomeDetail', segment: 'account/' }
      ]
    }),
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    AppComponent,
    HomePage,
    HomeDetailPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    TopicService,
    MessageService,
    RepliesService,
    TopicService,
    UserService,
    CollectService,
    CoreService
  ]
})
export class AppModule { }
