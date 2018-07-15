import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { FirebaseService } from '../../providers/firebase-service';
import { icons } from '../../providers/icons';
import { LoginPage } from '../login/login';
import { AngularFireAuth } from 'angularfire2/auth';
import { InAppBrowser } from '@ionic-native/in-app-browser';

@IonicPage()
@Component({
  selector: 'page-info',
  templateUrl: 'info.html',
})
export class InfoPage {

  infoObservable: any;
  info: any;
  appIcons: any = icons;
  myAppVersion: string = "2.0.0";
  logedIn: boolean = false;
  enableLogin: boolean = false;
  tapCount: number = 0;
  minTapCount: number = 3;
  phoneURLPrefix: string = "tel:";
  emailURLPrefix: string = "mailto:";
  
  constructor(private iab: InAppBrowser, private platform: Platform, public afAuth: AngularFireAuth, public navCtrl: NavController, public navParams: NavParams, public firebaseService: FirebaseService) {
    
    this.infoObservable = this.firebaseService.get('info');
    this.infoObservable.subscribe((data)=>{
        this.info = data[0];
        if(this.info.emailURLPrefix){
          this.emailURLPrefix = this.info.emailURLPrefix;
        }
        if(this.info.phoneURLPrefix){
          this.phoneURLPrefix = this.info.phoneURLPrefix;
        }
    }, (error) => {
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InfoPage');
    this.firebaseService.getObject("config").subscribe((data) => {
      if(data){
        if(data.enableLogin != undefined){
          this.enableLogin = data.enableLogin;
        }
        if(data.minTapCount != undefined){
          this.minTapCount = data.minTapCount;
        }
      }
    },(error) => {
      console.log(error);
    })
    this.afAuth.authState.subscribe((auth) => {
      if(auth){
        this.logedIn = true;
      } else {
        this.logedIn = false;
      }
    },(error) => {
      console.log(error);
    })
  }

  callThisNumber(number){
    try{
      let url = this.phoneURLPrefix+number;
      url = url.replace(/([ ()-])+/g,"");
      if(this.platform.is("cordova") && this.platform.is("ios")){
        this.iab.create(url,'_system').show();
      } else {
        window.open(url, '_system');
      }
    }catch(e){
      console.log(e);
    }
  }
  
  sendEmail(email){
    try{
      let url = this.emailURLPrefix+email;
      if(this.platform.is("cordova") && this.platform.is("ios")){
        this.iab.create(url,'_system').show();
      } else {
        window.open(url, '_system');
      }
    } catch(e){
      console.log(e);
    }
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

  authenticate(){
    this.tapCount = this.tapCount + 1;
    if(this.tapCount >= this.minTapCount){
      this.tapCount = 0;
      if(this.enableLogin == true && this.logedIn != true){
        this.navCtrl.push(LoginPage,{
        });
      }
    }
  }

  logOut(){
    this.afAuth.auth.signOut().then((data) => {
      this.logedIn = false;
      this.tapCount = 0;
    })
  }
}
