import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { icons } from '../../providers/icons';
import { FirebaseService } from "../../providers/firebase-service";

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

  constructor(public navCtrl: NavController, public navParams: NavParams, public firebaseService: FirebaseService) {
    this.customIcons = icons;
    this.contactObservable = this.firebaseService.get('contacts');
    this.contactObservable.subscribe((data)=>{
      console.log(data);
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
        console.log("male",this.male);
        console.log("female",this.female);
        
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
      var url = "tel:"+number;
      window.open(url,'_system', 'location=yes');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ContactPage');
  }

}
