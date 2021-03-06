import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from "../home/home";
import { ContactsPage } from "../contacts/contacts";
import { InfoPage } from '../info/info';
import { GalleryPage } from '../gallery/gallery';
import { ReportsPage } from '../reports/reports';

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = ContactsPage;
  tab3Root = GalleryPage;
  tab4Root = ReportsPage;
  tab5Root = InfoPage;
  

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TabsPage');
  }

}
