import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  error: any;
  email: any = "";
  password: any = "";

  constructor(public afAuth: AngularFireAuth, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  login(){
      this.afAuth.auth.signInWithEmailAndPassword(this.email,this.password).then(
        (success) => {
          console.log(success);
          this.error = undefined;
          if(this.navCtrl.canGoBack){
            this.navCtrl.pop()
          }
      }).catch(
        (err) => {
        console.log(err);
        this.error = err;
      })
    }
  

}
