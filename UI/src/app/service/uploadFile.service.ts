import { Observable } from 'rxjs';
import {AngularFireStorage, AngularFireStorageReference} from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import {TuiFileLike} from "@taiga-ui/kit";
import {forEachChild} from "@schematics/angular/third_party/github.com/Microsoft/TypeScript/lib/typescript";

// @Injectable({
//   providedIn: 'root'
// })

export abstract class UploadFileService {
  private storage: AngularFireStorage;
  // public reference: Observable<AngularFireStorageReference>;
  // private filePath: string | undefined;

  // public uploadPercent: Observable<number | undefined > | undefined;
  // public downloadURL: Observable<string> | undefined;


 protected constructor(firestoreStorage: AngularFireStorage) {
    this.storage = firestoreStorage;
  }



  public uploadFile(file: File, filePath: string) {
    filePath += file.name;
    const ref = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);

    task.snapshotChanges()
      .pipe(
        finalize(() => {
          const url = ref.getDownloadURL()
          url.subscribe(url => console.log(url))
          // console.log(url);
        })
      )
      .subscribe();
  }

  public uploadFiles (files: File[], filePath: string) {
   for (let file of files){
     this.uploadFile(file, filePath);
   }
  }
}
