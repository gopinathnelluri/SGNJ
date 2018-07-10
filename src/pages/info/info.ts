import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FirebaseService } from '../../providers/firebase-service';
import { icons } from '../../providers/icons';

@IonicPage()
@Component({
  selector: 'page-info',
  templateUrl: 'info.html',
})
export class InfoPage {

  infoObservable: any;
  info: any;
  appIcons: any = icons;
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public firebaseService: FirebaseService) {
    this.infoObservable = this.firebaseService.get('info');
    this.infoObservable.subscribe((data)=>{
        this.info = data[0];
    }, (error) => {
  
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InfoPage');
  }

  callThisNumber(number){
      var url = "tel:"+number;
      window.open(url,'_system', 'location=yes');
  }
  
  sendEmail(email){
    var url = "mailto:"+email;
      window.open(url,'_system', 'location=yes');
  }

}
