import { Observable } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';

export class UploadFileService {
  private storage: AngularFireStorage;
  private filePath: string;

  public uploadPercent: Observable<number | undefined > | undefined;
  public downloadURL: Observable<string> | undefined;


  constructor(firestoreStorage: AngularFireStorage, filePath: string) {
    this.storage = firestoreStorage;
    this.filePath = filePath.charAt(filePath.length - 1) === '/' ? filePath : filePath + '/';
  }

  // setPath(filePath: string){
  //   this.filePath = filePath.charAt(filePath.length - 1) === '/' ? filePath : filePath + '/';
  // }
  // set setPath(){
  //
  // }

  uploadFile(event: any) {
    const file = event.target.files[0];
    this.filePath += event.target.files[0].name;
    const ref = this.storage.ref(this.filePath);
    const task = this.storage.upload(this.filePath, file);

    this.uploadPercent = task.percentageChanges();
    // get notified when the download URL is available
    task.snapshotChanges().pipe(
      finalize(() => this.downloadURL = ref.getDownloadURL() )
    )
      .subscribe()
  }
}
