// import {Component, TemplateRef} from '@angular/core';
import { NbDialogRef, NbDialogService} from '@nebular/theme';
import {FormGroup, Validators} from '@angular/forms';
import {PhotoService} from "../../service/photo.service";
import {InputFileDropComponent} from "../../input-file-drop/input-file-drop.component";
import {ContactService} from "../../service/contact.service";
import {Contact} from "../../model/Contact";
// import {TuiFileLike} from "@taiga-ui/kit";
//
// import {ChangeDetectionStrategy} from '@angular/core';
// import {tuiPure} from '@taiga-ui/cdk';
// import {Observable, of, Subject, timer} from 'rxjs';
// import {map, mapTo, share, startWith, switchMap, tap} from 'rxjs/operators';


// import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject} from '@angular/core';
// import {TuiDestroyService, watch} from '@taiga-ui/cdk';
// import {TuiNotificationsService} from '@taiga-ui/core';
// import {TuiFileLike} from '@taiga-ui/kit';
// import {combineLatest, Observable, Subject, timer} from 'rxjs';
// import {mapTo, startWith, switchMap, takeUntil} from 'rxjs/operators';



import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FormControl} from '@angular/forms';
import {tuiPure} from '@taiga-ui/cdk';
import {TuiFileLike} from '@taiga-ui/kit';
import {isPresent} from '@taiga-ui/cdk';
import {combineLatest, Observable, Subject, timer, of} from 'rxjs';
import {
  filter, finalize,
  map,
  mapTo,
  mergeScan,
  pairwise,
  scan,
  share,
  startWith,
  switchMap,
  takeUntil,
  tap,
} from 'rxjs/operators';
import {AngularFireStorage} from "@angular/fire/storage";
import {ResizeImages, ResizeImagesDto} from "../../model/ResizeImages";

// class RejectedFile {
//   constructor(readonly file: TuiFileLike, readonly reason: string) {}
// }
//
// function isFile(file: unknown): file is File {
//   return file instanceof File;
// }
//
// function isRejectedFile(file: unknown): file is RejectedFile {
//   return file instanceof RejectedFile;
// }
//
// function convertRejected({file, reason}: RejectedFile): TuiFileLike {
//   return {
//     name: file.name,
//     size: file.size,
//     type: file.type,
//     content: reason,
//   };
// }
function isFile(file: unknown): file is File {
  return file instanceof File;
}

class RejectedFile {
  constructor(readonly file: TuiFileLike, readonly reason: string) {}
}

function convertRejected({file, reason}: RejectedFile): TuiFileLike {
  return {
    name: file.name,
    size: file.size,
    type: file.type,
    content: reason,
  };
}

@Component({
  selector: 'nb-participant-form',
  template: `
    <form [formGroup]="signUpForm">
      <nb-card>
        <nb-card-header>
          Add new Speaker
          <nb-icon icon="close-outline" (click)="close()"></nb-icon>
        </nb-card-header>
        <nb-card-body>
          <input formControlName="firstName" type="text" nbInput fullWidth fieldSize="small" placeholder="Irina">
          <input formControlName="lastName" type="text" nbInput fullWidth fieldSize="small" placeholder="Pavlova">
          <textarea formControlName="summary" nbInput fullWidth placeholder="ex-President of Onexim Sports"></textarea>
          <tui-root>
            <tui-input-file
              class="container"
              link="Choose an image"
              accept="image/*"
              formControlName ="files"
              [maxFileSize] = "5000000"
              [loadingFiles]="(loading$ | async)!"
              [rejectedFiles]="(rejected$ | async)!"
            ></tui-input-file>
          </tui-root>
        </nb-card-body>
        <nb-card-footer>
          <button nbButton outline status="danger" (click)="submit()">Create Speaker</button>
        </nb-card-footer>
      </nb-card>
    </form>
  `,
  styleUrls: ['./participant.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class ParticipantComponent {
  private static readonly STORAGE_PATH = 'speakersImg/';
  private static readonly DB_PATH = 'speakers';

  constructor(
              protected dialogRef: NbDialogRef<ParticipantComponent>,
              private contactService: ContactService,
              private photoService :PhotoService,
              private storage: AngularFireStorage,

  ) { }

  readonly control = new FormControl();

  signUpForm: FormGroup = new FormGroup({
    firstName: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(128)]),
    lastName: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(128)]),
    summary: new FormControl('', [Validators.required, Validators.maxLength(300)]),
    files: this.control,
  });

  get firstName() {
    return this.signUpForm.get('firstName');
  }

  get lastName() {
    return this.signUpForm.get('lastName');
  }

  get summary() {
    return this.signUpForm.get('summary');
  }

  get inputFile() {
    return this.signUpForm.get('files');
  }

  @tuiPure
  get loading$(): Observable<ReadonlyArray<File>> {
    return this.requests$.pipe(
      map(file => (file instanceof File ? [file] : [])),
      startWith([]),
    );
  }

  @tuiPure
  get rejected$(): Observable<ReadonlyArray<TuiFileLike>> {
    return this.requests$.pipe(
      map(file => (file instanceof RejectedFile ? [convertRejected(file)] : [])),
      tap(({length}) => {
        if (length) {
          this.control.setValue(null);
        }
      }),
      startWith([]),
    );
  }

  @tuiPure
  private get requests$(): Observable<RejectedFile | File | null> {
    return this.control.valueChanges.pipe(
      switchMap(file =>
        file ? this.serverRequest(file).pipe(startWith(file)) : of(null),
      ),
      share(),
    );
  }

  private serverRequest(file: File): Observable<RejectedFile | File | null> {
    const result =
      isFile(file)
        ? null
        : new RejectedFile(file, 'Not a valid file, try another one');

    return timer(200).pipe(mapTo(result));
  }

  close() {
    this.dialogRef.close();
  }

  submit() {
    const contact = new Contact();
    contact.firstName = this.firstName?.value as string;
    contact.lastName = this.lastName?.value as string;
    contact.summary = this.summary?.value as string;
    this.addContact(contact)
    this.dialogRef.close(contact);
  }

  private addContact(contact: Contact){
    const contactTask = this.contactService.createContact(contact, ParticipantComponent.DB_PATH);
    contactTask.then((docRef) => {
      console.log("Document written with ID: ", docRef.id);

      const bucketFilePath = ParticipantComponent.STORAGE_PATH + docRef.id;

      contact.id = docRef.id;
      contact.bucketFilePath = bucketFilePath;
      this.addImages(contact, bucketFilePath);
    })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });
  }

  private addImages(contact: Contact, bucketFilePath: string) {
    const resizeImages: ResizeImages = new ResizeImages;
    const filePath = bucketFilePath + '/avatar';
    const ref = this.storage.ref(filePath);
    const uploadFileTask = this.storage.upload(filePath, this.inputFile?.value,);

    uploadFileTask.snapshotChanges()
      .pipe(
        finalize(() => {
          const url = ref.getDownloadURL()
          url.subscribe(url => {
            resizeImages.filePath = filePath;
            resizeImages.original = url;
            contact.avatar = resizeImages;
            contact.img = url;
            this.updateContact(contact);
          })
        })
      )
      .subscribe();
  }

  private updateContact(contact: Contact) {
   const task =  this.contactService.updateContact(contact, ParticipantComponent.DB_PATH);

   task.then(() => {
     console.log("Document updated with ID: ", contact.id);
   })
     .catch((error) => {
       console.error("Error updating document: ", error);
     });
  }
}
