import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import firebase from 'firebase';
import { AngularFireAuth } from 'angularfire2/auth';

import { ActionSheetController, LoadingController } from 'ionic-angular';
import { Camera } from '@ionic-native/camera';
import { FirebaseService } from '../../providers/firebase-service';
import { FirebaseListObservable } from 'angularfire2/database';

import { Slides } from 'ionic-angular';

/**
 * Generated class for the GalleryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-gallery',
  templateUrl: 'gallery.html',
  providers: [Camera]
})
export class GalleryPage {

  logedIn: boolean = false;
  srcImage: any;
  downloadURL: any;
  self = this;
  imageListObservable: FirebaseListObservable<any[]>;
  imageList: any[];
  displaySlider: boolean = false;
  initialSlide: number = 0;
  imageQuality: number = 10;
  editMode: boolean = false;
  @ViewChild(Slides) slides: Slides;

  constructor(public afAuth: AngularFireAuth,
        public navCtrl: NavController,
        public navParams: NavParams,
        private firebaseService: FirebaseService,
        public actionSheetCtrl: ActionSheetController,
        public loadingCtrl: LoadingController,
        private camera: Camera) {
        this.displayImages();
  }

  changeMode(){
    this.editMode = !this.editMode;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GalleryPage');
    this.firebaseService.getObject("config").subscribe((data) => {
      if(data){
        if(data.imageQuality != undefined){
          this.imageQuality = data.imageQuality;
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
    this.imageListObservable = this.firebaseService.get('storage/images');
    this.imageListObservable.subscribe((data) => {
      this.imageList = data;
    },(error) => {
      console.log(error);
    })
  }

  

  presentActionSheet() {
    const actionSheet = this.actionSheetCtrl.create({
      buttons: [
        {
          text: 'Choose Photo',
          handler: () => {
            this.getPicture(0); // 0 == Library
          }
        },
        {
          text: 'Take Photo',
          handler: () => {
            this.getPicture(1); // 1 == Camera
          }
        },
        /*
        {
          text: 'Demo Photo',
          handler: () => {
            //this.srcImage = './assets/imgs/logo.png';
            this.sampleImage();
          }
        },
        */
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });
    actionSheet.present();
  }

  getPicture(sourceType: number) {
    this.camera.getPicture({
      quality: this.imageQuality,
      destinationType: this.camera.DestinationType.DATA_URL, // DATA_URL
      sourceType,
      allowEdit: false,
      saveToPhotoAlbum: false,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true
    }).then((imageData) => {
      this.srcImage = `data:image/jpeg;base64,${imageData}`;
      this.upload();
    }, (err) => {
      console.log(`ERROR -> ${JSON.stringify(err)}`);
    });
  }


  

  displayImages(){
  }

  selectImage(i: number){
    if(this.logedIn == true && this.editMode == true){
      this.confirmDeleteImage(i);
    } else{
      this.initialSlide = i;
      this.displaySlider = true;
    }
  }

  confirmDeleteImage(i: number){
    const actionSheet = this.actionSheetCtrl.create({
      buttons: [
        {
          text: 'Delete Photo',
          handler: () => {
            this.deleteImage(i);
          }
        },{
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });
    actionSheet.present();
  }

  deleteImage(i: number){
    let name = this.imageList[i].name;
    console.log(name);
    this.imageListObservable.remove(this.imageList[i].$key).then((data) => {
      firebase.storage().ref('/images/'+name).delete().then((data) => {
      })
    })
  }

  closeSlider(){
    this.displaySlider = false;
  }

  upload(){
      let loader = this.loadingCtrl.create({
        content: 'Uploading...'
      });
      loader.present();
      let name = new Date().valueOf()+".jpeg" 
      let firestoreRef = firebase.storage().ref('/images/'+name).putString(this.srcImage, 'data_url')
      firestoreRef.on("state_changed", (snapshot) => {

      }, (error) => {

      }, () => {
        let object = {
          "downloadURL": firestoreRef.snapshot.downloadURL,
          "contentType": firestoreRef.snapshot.metadata.contentType,
          "name": firestoreRef.snapshot.metadata.name,
          "size": firestoreRef.snapshot.metadata.size
        }
        this.imageListObservable.push(object).then((data) => {
          loader.dismissAll();
        })
      })
  }

}
