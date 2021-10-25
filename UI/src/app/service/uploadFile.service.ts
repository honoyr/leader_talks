import {AngularFireStorage, AngularFireStorageReference} from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';

export abstract class UploadFileService {
  private storage: AngularFireStorage;

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
