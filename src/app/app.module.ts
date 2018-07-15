import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { AngularFireModule } from 'angularfire2';
import { firebaseConfig } from '../environment';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { TabsPage } from "../pages/tabs/tabs";
import { TabsPageModule } from "../pages/tabs/tabs.module";
import { HomePageModule } from "../pages/home/home.module";
import { SchedulePageModule } from "../pages/schedule/schedule.module";
import { LocationPageModule } from "../pages/location/location.module";
import { FirebaseService } from "../providers/firebase-service";
import { ContactsPageModule } from "../pages/contacts/contacts.module";
import { ContactsPage } from "../pages/contacts/contacts";
import { DetailsPageModule } from '../pages/details/details.module';
import { InfoPage } from '../pages/info/info';
import { InfoPageModule } from '../pages/info/info.module';
import { GalleryPageModule } from '../pages/gallery/gallery.module';
import { GalleryPage } from '../pages/gallery/gallery';
import { LoginPageModule } from '../pages/login/login.module';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { FCM } from '@ionic-native/fcm';

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    HttpModule,
    TabsPageModule,
    HomePageModule,
    InfoPageModule,
    SchedulePageModule,
    DetailsPageModule,
    LocationPageModule,
    ContactsPageModule,
    GalleryPageModule,
    LoginPageModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ContactsPage,
    InfoPage,
    TabsPage,
    GalleryPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    FirebaseService,
    AngularFireAuth,
    InAppBrowser,
    FCM,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
