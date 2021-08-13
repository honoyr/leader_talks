import { environment } from '../../environments/environment';
import {Injectable} from "@angular/core";

import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';

interface UploadFileParams {
  event: any;
}

@Component({
  selector: 'app-user-service',
  template: `
  <ul>
    <li *ngFor="let item of item$ | async">
      <h2>{{ item.first_name}} {{ item.last_name}}</h2>
      <p>{{item.summary}}</p>
      <img
        width="250"
        loading="lazy"
        alt="Random image"
        src="{{item.img}}">
    </li>
  </ul>

<!--  <button nbButton (click)="uploadImg()">Upload img</button>-->
<!--  <input type="file" (change)="CreateUser($event)">-->
<!--  <div>{{ uploadPercent | async }}</div>-->
<!--  <a [href]="downloadURL | async">{{ downloadURL | async }}</a>-->
  `
})

// @Injectable()
export class UserService {
  item$: Observable<any[]>;
  db: AngularFirestore;

  constructor(firestore: AngularFirestore, firestoreStorage: AngularFireStorage) {
    this.db = firestore;

    this.item$ = firestore.collection('speakers').valueChanges();

  }

  showCards(){
    this.item$ = this.db.collection('speakers').valueChanges();
  }


}
