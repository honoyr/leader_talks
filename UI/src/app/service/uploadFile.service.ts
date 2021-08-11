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
    // const file = event.target.files[0];
    filePath += file.name;
    // filePath += 'test';
    // file.content
    // console.log(file);
    // console.log(`name = ${file.name} | SRC = ${file.src} | content ${file.content} TYPE = ${file.type}`);
    const ref = this.storage.ref(filePath);
    console.log(ref);
    const task = this.storage.upload(filePath, file);

    // this.uploadPercent = task.percentageChanges();
    // console.log(task.percentageChanges());
    // // get notified when the download URL is available

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
