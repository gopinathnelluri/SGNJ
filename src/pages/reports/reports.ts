import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { FirebaseService } from '../../providers/firebase-service';
import { InAppBrowser } from '@ionic-native/in-app-browser';


/**
 * Generated class for the ReportsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-reports',
  templateUrl: 'reports.html',
})
export class ReportsPage {
  
  reportsCollection: any[];

  constructor(private iab: InAppBrowser, private platform: Platform, public navCtrl: NavController, public navParams: NavParams, public firebaseService: FirebaseService) {
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReportsPage');
    this.firebaseService.get("reports").subscribe((data) => {
      console.log(data);
      if(data){
        this.reportsCollection = data;
      } else {
        this.reportsCollection = [];
      }
    })
  }

  openWebSite(website){
    try{
      if(this.platform.is("cordova") && this.platform.is("ios")){
        this.iab.create(website,'_system').show();
      } else {
        window.open(website, '_system');
      }
    }catch(e){
      console.log(e);
    }
  }

}
