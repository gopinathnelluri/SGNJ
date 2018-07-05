import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FirebaseService } from "../../providers/firebase-service";
import { Observable } from 'rxjs/Observable';
import { SchedulePage } from "../schedule/schedule";
import { icons } from '../../providers/icons';
import { categories } from '../../providers/categories';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  
  customIcons: any;
  categoriesList: any
  segment: string;

  maleSportsListObservable: Observable<any[]>;
  maleSportsList: any[];
  maleListOptionsDisplay: any[] = [];

  femaleSportsListObservable: Observable<any[]>;
  femaleSportsList: any[];
  femaleListOptionsDisplay: any[] = [];

  

  constructor(public navCtrl: NavController, private firebaseService: FirebaseService) {
       this.customIcons = icons;
       this.segment = "men";
       this.categoriesList = categories;
       
       this.maleSportsListObservable = this.firebaseService.get('male/list');
       
       this.maleSportsListObservable.subscribe((data)=>{
         console.log(data);
          this.maleSportsList = data;
          this.maleListOptionsDisplay = [];
          this.maleSportsList.forEach((item) =>{
              this.maleListOptionsDisplay.push(false);
          })
    
       })
       

       this.femaleSportsListObservable = this.firebaseService.get('female/list');
       this.femaleSportsListObservable.subscribe((data)=>{
          this.femaleSportsList = data;
          this.femaleListOptionsDisplay = [];
          this.femaleSportsList.forEach((item) =>{
              this.femaleListOptionsDisplay.push(false);
          })
       })
       
  }

  navigateToSport(event,item,gender,category){
    this.navCtrl.push(SchedulePage,{
      "category": category,
      "sportItem" : item,
      "gender": gender
    });
  }

  expandMaleSportsListOptions(index){
    if(this.maleListOptionsDisplay[index] == true){
        this.maleListOptionsDisplay[index] = false;
    } else {
        this.maleListOptionsDisplay[index] = true;
        for(var i = 0; i < this.maleListOptionsDisplay.length; ++i){
          if(i != index){
              this.maleListOptionsDisplay[i] = false;
          }
        }
    } 
  }

  expandFemaleSportsListOptions(index){
    if(this.femaleListOptionsDisplay[index] == true){
        this.femaleListOptionsDisplay[index] = false;
    } else {
        this.femaleListOptionsDisplay[index] = true;
        for(var i = 0; i < this.femaleListOptionsDisplay.length; ++i){
          if(i != index){
              this.femaleListOptionsDisplay[i] = false;
          }
        }
    } 
  }

}
