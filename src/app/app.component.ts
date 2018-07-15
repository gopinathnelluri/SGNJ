import { Component, ViewChild } from '@angular/core';
import { Platform, NavController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TabsPage } from '../pages/tabs/tabs';

import { ToastController } from 'ionic-angular';
import { FirebaseService } from '../providers/firebase-service';
//import { Push, PushObject, PushOptions } from '@ionic-native/push';
//import { FCM } from '@ionic-native/fcm';
import { FCM } from '@ionic-native/fcm';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild('myNav') navCtrl: NavController;
  rootPage:any = TabsPage;
  myAppVersion: string = "2.0.0";
  currentReleaseVersion: any;
  timestamp = new Date().valueOf();

  constructor(public fcm: FCM, private toastCtrl: ToastController, private platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, public firebaseService: FirebaseService) {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      
      statusBar.styleDefault();
      splashScreen.hide();

      this.versionCheck();
      this.generalToast();

      if(this.platform.is("cordova")){
        /*
        this.fcm.getToken().then(token => {
          // Your best bet is to here store the token on the user's profile on the
          // Firebase database, so that when you want to send notifications to this 
          // specific user you can do it from Cloud Functions.
        });
  
  
        this.fcm.onNotification().subscribe( data => {
          console.log(data);
          if(data.wasTapped){
            //Notification was received on device tray and tapped by the user.
          }else{
            //Notification was received in foreground. Maybe the user needs to be notified.
          }
        });
        */

      }
      

    });
  }

  versionCheck(){
    this.firebaseService.getObject("app/current").subscribe((releaseVersionData) => {
        if(releaseVersionData){
          this.currentReleaseVersion = releaseVersionData.version;
          if(this.currentReleaseVersion != this.myAppVersion && releaseVersionData.shouldToastDisplay == true){
            this.presentToast(releaseVersionData.toastConfig);
          }
        }
    })
  }

  generalToast(){
    this.firebaseService.getObject("app/general/toast").subscribe((toast) => {
        if(toast.timestamp > this.timestamp){
          this.presentToast(toast.toastConfig);
        }
    })
  }

  presentToast(config) {
    let toast = this.toastCtrl.create(config);

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
  
    toast.present();
  }

  pushSetup(){

  }
}

