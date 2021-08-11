import {UploadFileService} from "./uploadFile.service"
import { Injectable } from '@angular/core';
import {AngularFireStorage} from "@angular/fire/storage";

@Injectable({
  providedIn: 'root'
})

export class PhotoService extends UploadFileService {


  constructor(public firestoreStorage: AngularFireStorage) {
   super(firestoreStorage);
  }

//  resize photo method
//

}
