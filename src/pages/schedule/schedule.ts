import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FirebaseService } from "../../providers/firebase-service";
import { LocationPage } from "../location/location";
import { categories } from '../../providers/categories';
import { Calendar } from '@ionic-native/calendar';
import { DetailsPage } from '../details/details';

@IonicPage()
@Component({
  selector: 'page-schedule',
  templateUrl: 'schedule.html',
  providers: [Calendar]
})
export class SchedulePage {
  category: any;
  categoryDetails: any;
  sport: any;
  gender: any;
  scheduleData: any;
  scheduleObject: any;
  showBreadCrumb: any;
  calenderTitle: any = "";

  objectKeys = Object.keys;
  
  constructor(public navCtrl: NavController, public navParams: NavParams, private firebaseService: FirebaseService, private calendar: Calendar) {
    this.sport = navParams.get('sportItem');
    this.category = navParams.get('category');
    this.gender = navParams.get('gender');
    this.categoryDetails = categories[this.category];
    
    this.scheduleObject = this.firebaseService.get(this.gender+ '/sports/'+this.sport.path+"/"+this.category+"/schedule");
    
    this.scheduleObject.subscribe((data) => {
      if(data){
        this.scheduleData = data;
        this.calenderTitle = (this.gender=='male'?'Men':'Women')+"'s "+this.sport.name+" : " +this.categoryDetails.title;
      }
    })
    


  }

  details(event, i ){
    this.navCtrl.push(DetailsPage,{
      "sport" : this.sport,
      "category": this.category,
      "gender": this.gender,
      "index": i
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SportPage');
  }

  dateClicked(event,i){
    var destination = this.scheduleData.schedule[i].location.address+", "+this.scheduleData.schedule[i].location.city+", "+this.scheduleData.schedule[i].location.state+" "+this.scheduleData.schedule[i].location.zip;
      
    this.calendar.hasReadWritePermission().then((data) => {
      if(data){
        this.calendar.createEventInteractively( this.calenderTitle, destination, "Added by so and so app (example note)", new Date(this.scheduleData.schedule[i].date), null);
      } else {
        this.calendar.requestReadWritePermission().then((data) => {
            if(data){
              this.calendar.createEventInteractively( this.calenderTitle, destination, "Added by so and so app (example note)", new Date(this.scheduleData.schedule[i].date), null);
            }
        })
      }
    })
  }

  addressClicked(event,i){
      this.navCtrl.push(LocationPage,{
        "sportItem" : this.sport,
        "location":  this.scheduleData.schedule[i].location
      });
  }

  ionViewDidEnter(){
    this.showBreadCrumb = true;
  }

  ionViewWillLeave(){
    this.showBreadCrumb = false;
  }
}
