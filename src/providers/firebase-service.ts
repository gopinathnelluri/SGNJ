//import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable()
export class FirebaseService {

  constructor(private afd: AngularFireDatabase) {
  }

  get(listName){
    return this.afd.list(listName);
  }

}
