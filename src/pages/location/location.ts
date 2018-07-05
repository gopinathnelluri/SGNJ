import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { LaunchNavigator, LaunchNavigatorOptions } from '@ionic-native/launch-navigator';
import { icons } from '../../providers/icons';
//import { InAppBrowser } from '@ionic-native/in-app-browser';

/**
 * Generated class for the LocationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-location',
  templateUrl: 'location.html',
  providers: [LaunchNavigator]
})
export class LocationPage {

  sport: any;
  location: any;
  appsObject: any;
  apps: any;
  customIcons: any;
  destination: any;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              private launchNavigator: LaunchNavigator,
              private platform: Platform
              //private iab: InAppBrowser
              ) {
      this.customIcons = icons;
      this.sport = navParams.get('sportItem');
      this.location = navParams.get('location');
      this.destination = this.location.address+", "+this.location.city+", "+this.location.state+" "+this.location.zip;
      
      if (this.platform.is('cordova')) {
          this.appsObject = launchNavigator.availableApps();
          this.appsObject.then((data) => {
            this.apps = data;
          })
      }
      
  }
  

  ionViewDidLoad() {
    console.log('ionViewDidLoad LocationPage');
  }

  openInGoolge(){
    
    var options: LaunchNavigatorOptions = {
      //start: this.destination,
      app: this.launchNavigator.APP.GOOGLE_MAPS
    };
    this.launchNavigator.navigate(this.destination, options)
    .then(
      success => console.log('Launched navigator'),
      error => console.log('Error launching navigator', error)
    );
  }

  openInAppleMaps(){
    var options: LaunchNavigatorOptions = {
      //start: this.destination,
      app: this.launchNavigator.APP.APPLE_MAPS
    };
    this.launchNavigator.navigate(this.destination, options)
    .then(
      success => console.log('Launched navigator'),
      error => console.log('Error launching navigator', error)
    );
  }

  openInUber(){
    var options: LaunchNavigatorOptions = {
      //start: this.destination,
      app: this.launchNavigator.APP.UBER //.APPS.UBER
    };
    this.launchNavigator.navigate(this.destination, options)
    .then(
      success => console.log('Launched navigator'),
      error => console.log('Error launching navigator', error)
    );
  }

  openInLyft(){
    var options: LaunchNavigatorOptions = {
      //start: this.destination,
      app: this.launchNavigator.APP.LYFT
    };
    this.launchNavigator.navigate(this.destination, options)
    .then(
      success => console.log('Launched navigator'),
      error => console.log('Error launching navigator', error)
    );
  }

  openInWaze(){
    var options: LaunchNavigatorOptions = {
      //start: this.destination,
      app: this.launchNavigator.APP.WAZE
    };
    this.launchNavigator.navigate(this.destination, options)
    .then(
      success => console.log('Launched navigator'),
      error => console.log('Error launching navigator', error)
    );
  }

  openInBrowser(){
    /*
    var options : InAppBrowserOptions = {
        location : 'yes',//Or 'no' 
        hidden : 'no', //Or  'yes'
        clearcache : 'yes',
        clearsessioncache : 'yes',
        zoom : 'yes',//Android only ,shows browser zoom controls 
        hardwareback : 'yes',
        mediaPlaybackRequiresUserAction : 'no',
        shouldPauseOnSuspend : 'no', //Android only 
        closebuttoncaption : 'Close', //iOS only
        disallowoverscroll : 'no', //iOS only 
        toolbar : 'yes', //iOS only 
        enableViewportScale : 'no', //iOS only 
        allowInlineMediaPlayback : 'no',//iOS only 
        presentationstyle : 'pagesheet',//iOS only 
        fullscreen : 'yes',//Windows only    
    };
    */
    var url = "https://www.google.com/maps/search/?api=1&query="+this.destination;
    window.open(url,'_system', 'location=yes');
    
    /*
    const browser = this.iab.create(url);

    browser.on("exit").subscribe(event => {
      console.log("closed");
    })
    */
  }

}
