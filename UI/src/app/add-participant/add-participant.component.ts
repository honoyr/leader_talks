import {Component, OnInit, TemplateRef} from '@angular/core';
import {NbDialogService} from "@nebular/theme";
// import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';

import {InputFileDropComponent} from "../input-file-drop/input-file-drop.component";
import {ParticipantComponent} from "./components/participant.component";
// import {InputFileDropComponent} from '../input-file-drop'

interface UploadFileParams {
  event: any;
}

@Component({
  selector: 'app-add-participant',
  templateUrl: './add-participant.component.html',
  styleUrls: ['./add-participant.component.scss']
})
export class AddParticipantComponent implements OnInit {
  db: AngularFirestore;
  storage: AngularFireStorage;
  downloadURL: Observable<string> | undefined;

  speaker: object = {};

  constructor(
      private dialogService: NbDialogService,
      firestore: AngularFirestore,
      firestoreStorage: AngularFireStorage
  ) {
    this.db = firestore;
    this.storage = firestoreStorage;
  }

  CreateUser(event: any) {
    // console.log(event.target.files);
    const name = "Irina Pavlova";
    const file = event.target.files[0];
    const filePath = 'speakersImg/' + name;
    const ref = this.storage.ref(filePath);
    // const task = ref.putString(file);
    // const task = this.storage.upload(filePath, "https://lh3.googleusercontent.com/h_hDXPaTtfsDhtUSSizRYNMxLdaJmaz7yw53oAorZcB9rsKI_QVR95oi2e_ds-5LIhseabj755Mz-gLovx_lyqnNaeIPFPlvTD-jIr0Ui0BRovjRQUvehHPUF4FapjcA3pqU6RASXmCNr65EBD1wxbpIP5QGy_GdveSI9YjpWHrHjSGrruiT4LYZPh7ZmNbeLC93JiEw2XJd_TMbgL0YWMWW7MZs3QT0Wo2MDP05uj8dL69CnOffYwHgWmbwuqUmMXjNAFb8opqpTglRdJjWHoW2dYmKOnsPn8U60zlT02G8WIWx8j4Tfm5n6JmMnIycdiNFtirbll_hVV1lj9GwU6mmshemKv-HA-VvS1KWFhLt7DX4QUuv0_fIDWg4w0UBVs1ahnaEvLso2GVG_8QU7e9YJrDVGcrNb09dVo_tFb2ZpjlQNvtweSoaVzHVCiQ32qNMgbJMZpaRbHh9Y7RTM6KO-dhhQ-SfNsNkIFfuHIXMQe3kJPrxrzJYKIIIZg8gkjiHWUCUvWFWEB6zIPDlEM6cfE7OJ5XwOMPtaaSRNpbjaAVyRCp1UQrpTj2ehMnIGiXI8MKKvWMFvIyTIYgmRRNG32xV0xbI5LAhcoTIjSl8H0XVaXhdNnl8UOe4Ru5khBNahtdJXnx5XeyWj7Su4V0H-x85SYa6Z4jiBeQBcjnGl9E6cpFhWAJq8JnZaXVdA3-hKtePTYJ4h-kc0bUmPYo=w1670-h1252-no?authuser=0");
    const task = this.storage.upload(filePath, file);
    // @ts-ignore
    this.uploadPercent = task.percentageChanges();
    // get notified when the download URL is available
    task.snapshotChanges()
      .pipe(
        finalize(() => {
          this.downloadURL = ref.getDownloadURL();
          ref.getDownloadURL().subscribe((url) => {
            this.addUserData({user: "user"}, url);
          })
        })
      )
      .subscribe();

    // this.downloadURL().subscribe((url) => console.log(url));


  }

  addUserData(user: object, url: string){
    const speaker = {
      "title": "Irina Pavlova",
      "summary": "ex-President of Onexim Sports",
      "img": [url]
    };
    console.log(user);
    this.db.collection('speakers').add(speaker).then((docRef) => {
      console.log("Document written with ID: ", docRef.id);
    })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });
  }

  open() {
    this.dialogService.open(ParticipantComponent)
      .onClose.subscribe(speaker => console.log(speaker));
  }

  createParticipant(){

  }

  ngOnInit(): void {
  }

}
