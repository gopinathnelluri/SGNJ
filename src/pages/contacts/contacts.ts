import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { icons } from '../../providers/icons';
import { FirebaseService } from "../../providers/firebase-service";
import { InAppBrowser } from '@ionic-native/in-app-browser';

@IonicPage()
@Component({
  selector: 'page-contacts',
  templateUrl: 'contacts.html',
})
export class ContactsPage {
  customIcons: any;
  contactObservable: any;
  contact: any;
  segment: string = "male";
  male: any;
  female: any;
  isIOS: boolean = true;
  emailURLPrefix: string = "mailto:";
  phoneURLPrefix: string = "tel:";

  constructor(private iab: InAppBrowser, private platform: Platform, public navCtrl: NavController, public navParams: NavParams, public firebaseService: FirebaseService) {
    this.customIcons = icons;
    this.firebaseService.getObject("app/general/prefix").subscribe((data) => {
      if(data){
        if(data.emailURLPrefix){
          this.emailURLPrefix = data.emailURLPrefix;
        }
        if(data.phoneURLPrefix){
          this.phoneURLPrefix = data.phoneURLPrefix;
        }
      }
    })
    this.contactObservable = this.firebaseService.get('contacts');
    this.contactObservable.subscribe((data)=>{
      if(data != undefined && data.length >= 1){
        if(data.length == 1){
          if(data[0].$key == "male"){
            this.male = data[0];
            this.female = [];
          } else if(data[0].$key == "female"){
            this.female = data[0];
            this.male = [];
          }
        } 
        if(data.length == 2){
          if(data[0].$key == "male"){
            this.male = data[0];
          } else if(data[0].$key == "female"){
            this.female = data[0];
          }
          if(data[1].$key == "male"){
            this.male = data[1];
          } else if(data[1].$key == "female"){
            this.female = data[1];
          }
        } 
        
      } else {
        this.male = [];
        this.female = [];
      }
    }, (error) => {
      this.male = [];
      this.female = [];
    })    
  }

  callThisNumber(number){
      var url = this.phoneURLPrefix+number;
      url = url.replace(/([ ()-])+/g,"");
      try{
        if(this.platform.is("cordova") && this.platform.is("ios")){
          this.iab.create(url,'_system').show();
        } else {
          window.open(url, '_system');
        }  
      }catch(e){
        console.log(e);
      }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ContactPage');
  }

}
