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
  scheduleFullData:any;
  scheduleObject: any;
  showBreadCrumb: any;
  calenderTitle: any = "";

  objectKeys = Object.keys;
  search: String = "";
  searcRegEx: any = new RegExp("");
  
  constructor(public navCtrl: NavController, public navParams: NavParams, private firebaseService: FirebaseService, private calendar: Calendar) {
    this.sport = navParams.get('sportItem');
    this.category = navParams.get('category');
    this.gender = navParams.get('gender');
    this.categoryDetails = categories[this.category];
    
    this.scheduleObject = this.firebaseService.get(this.gender+ '/sports/'+this.sport.path+"/"+this.category+"/schedule");
    
    this.scheduleObject.subscribe((data: any[]) => {
      if(data){
        this.scheduleFullData = data.sort(this.sortSchedule);
        this.dataUpdateOnView();
      } else {
        this.scheduleData = [];
      }
    }, (error) => {
      this.scheduleData = [];
    })
  }

  sortSchedule(a,b){
    if(new Date(a.details.date).valueOf() == new Date(b.details.date).valueOf()) {
      if(a.details.time.toUpperCase().toString().includes("AM") && b.details.time.toUpperCase().toString().includes("PM")){
        return -1;
      } else if(a.details.time.toUpperCase().toString().includes("PM") && b.details.time.toUpperCase().toString().includes("AM")){
        return 1;
      } else if(a.details.time.toUpperCase().toString() != "" && b.details.time.toUpperCase().toString() != ""){
        /* 12 PM Check Start*/
        if(a.details.time.toUpperCase().toString().includes("PM")
            && b.details.time.toUpperCase().toString().includes("PM")
            && ((a.details.time.toUpperCase().toString() >= "12:00 PM" && a.details.time.toUpperCase().toString() <= "12:59 PM")
            || (b.details.time.toUpperCase().toString() >= "12:00 PM" && b.details.time.toUpperCase().toString() <= "12:59 PM"))){
            
              if((a.details.time.toUpperCase().toString() >= "12:00 PM" && a.details.time.toUpperCase().toString() <= "12:59 PM")
                && (b.details.time.toUpperCase().toString() >= "12:00 PM" && b.details.time.toUpperCase().toString() <= "12:59 PM")){
                if(a.details.time.toUpperCase().toString() < b.details.time.toUpperCase().toString()){
                  return -1;
                } else if(a.details.time.toUpperCase().toString() > b.details.time.toUpperCase().toString()){
                  return 1;
                }
              } else if((a.details.time.toUpperCase().toString() >= "12:00 PM" && a.details.time.toUpperCase().toString() <= "12:59 PM")){
                return -1;
              } else {
                return 1;
              }
        } /* 12 PM Check End*/
        else if(a.details.time.toUpperCase().toString().includes("AM") /* 12 AM Check Start*/
        && b.details.time.toUpperCase().toString().includes("AM")
        && ((a.details.time.toUpperCase().toString() >= "12:00 AM" && a.details.time.toUpperCase().toString() <= "12:59 AM")
        || (b.details.time.toUpperCase().toString() >= "12:00 AM" && b.details.time.toUpperCase().toString() <= "12:59 AM"))){
        
          if((a.details.time.toUpperCase().toString() >= "12:00 AM" && a.details.time.toUpperCase().toString() <= "12:59 AM")
            && (b.details.time.toUpperCase().toString() >= "12:00 AM" && b.details.time.toUpperCase().toString() <= "12:59 AM")){
            if(a.details.time.toUpperCase().toString() < b.details.time.toUpperCase().toString()){
              return -1;
            } else if(a.details.time.toUpperCase().toString() > b.details.time.toUpperCase().toString()){
              return 1;
            }
          } else if((a.details.time.toUpperCase().toString() >= "12:00 AM" && a.details.time.toUpperCase().toString() <= "12:59 AM")){
            return -1;
          } else {
            return 1;
          }
        }/* 12 AM Check end*/
        else if(a.details.time.toUpperCase().toString() < b.details.time.toUpperCase().toString()){
          return -1;
        } else if(a.details.time.toUpperCase().toString() > b.details.time.toUpperCase().toString()){
          return 1;
        }
      } else if(a.details.time.toUpperCase().toString() == ""){
        return 1
      } else if(b.details.time.toUpperCase().toString() == ""){
        return -1;
      }
      return 1;
    } else if(new Date(a.details.date).valueOf() < new Date(b.details.date).valueOf()) {
      return -1;
    } else if(new Date(a.details.date).valueOf() > new Date(b.details.date).valueOf()) {
      return 1;
    }
    return 1;
  }

  filter(){
    /*
    var a = this.search.toUpperCase().toString().split(";");
    var temp = "";
    if(a.length > 0){
      temp += "(^"+a[0]+")";
      for(var i = 1; i < a.length; ++i){
        if(a[i] != null && a[i] != undefined && a[i] != ""){
          temp += "|(^"+a[i]+")";
        }
      }
    }*/
    this.searcRegEx = new RegExp("(^"+this.search.toUpperCase().toString()+")");
    this.dataUpdateOnView();
  }

  dataUpdateOnView(){
    this.scheduleData = [];
    if(this.search != null && this.search != undefined && this.search != ""){
      this.scheduleFullData.forEach(element => {
        if(element.details && element.details.scores){
          for(var i = 0; i < element.details.scores.length; ++i){
            if(element.details.scores[i].team.toUpperCase().toString().match(this.searcRegEx)){
              this.scheduleData.push(element);
              break;
            }
          }
        }
      });
    } else{
      this.scheduleData = this.scheduleFullData;
    }
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
    }).catch((e)=> {
      
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
