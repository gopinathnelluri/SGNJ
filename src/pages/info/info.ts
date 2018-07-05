import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FirebaseService } from '../../providers/firebase-service';
import { icons } from '../../providers/icons';

/**
 * Generated class for the InfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

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
      console.log(data);
        this.info = data[0];
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InfoPage');
  }

}
