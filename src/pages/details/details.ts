import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FirebaseService } from '../../providers/firebase-service';
import { Calendar } from '@ionic-native/calendar';
import { LocationPage } from '../location/location';
import { categories } from '../../providers/categories';
import { Platform } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-details',
  templateUrl: 'details.html',
  providers: [Calendar]
})
export class DetailsPage {

  sport: any;
  category: any;
  gender: any;
  index: any;
  detailsObject: any;
  details: any;
  calenderTitle: any = "";
  categoryDetails: any;
  
  constructor(public navCtrl: NavController, public navParams: NavParams, private firebaseService: FirebaseService, private calendar: Calendar, public plt: Platform) {
    this.sport = navParams.get('sport');
    this.category = navParams.get('category');
    this.gender = navParams.get('gender');
    this.index = navParams.get('index');
    this.categoryDetails = categories[this.category];
    
    this.detailsObject = this.firebaseService.get(this.gender+ '/sports/'+this.sport.path+"/"+this.category+"/schedule"+"/"+this.index);
    this.detailsObject.subscribe((data) => {
      if(data ){
        this.details = data[0];
        this.calenderTitle = (this.gender=='male'?'Men':'Women')+"'s "+this.sport.name+" : " +this.categoryDetails.title;
      }
    })
    
  }

  dateClicked(event,i){
    var destination = this.details.location.address+", "+this.details.location.city+", "+this.details.location.state+" "+this.details.location.zip;
    if(this.plt.is('cordova') && (this.plt.is('ios') || this.plt.is('android'))){
      this.calendar.hasReadWritePermission().then((data) => {
        if(data){
          this.calendar.createEventInteractively( this.calenderTitle, destination, "Added by Sikh Games of New Jersey app.", new Date(this.details.date), null);
        } else {
          this.calendar.requestReadWritePermission().then((data) => {
              if(data){
                this.calendar.createEventInteractively( this.calenderTitle, destination, "Added by Sikh Games of New Jersey app.", new Date(this.details.date), null);
              }
          })
        }
      })
    }
  }

  addressClicked(event,i){
      this.navCtrl.push(LocationPage,{
        "sportItem" : this.sport,
        "location":  this.details.location
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DestailsPage');
  }

}
