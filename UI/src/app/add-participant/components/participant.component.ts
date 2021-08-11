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
import {combineLatest, Observable, Subject, timer} from 'rxjs';
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

class RejectedFile {
  constructor(readonly file: TuiFileLike, readonly reason: string) {}
}

function isFile(file: unknown): file is File {
  return file instanceof File;
}

function isRejectedFile(file: unknown): file is RejectedFile {
  return file instanceof RejectedFile;
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
<!--            <tui-input-file-->
<!--              [ngModel]="files"-->
<!--              [multiple]="true"-->
<!--              [loadingFiles]="loadingFiles"-->
<!--              [(rejectedFiles)]="rejectedFiles"-->
<!--              (ngModelChange)="onModelChange($event)"-->
<!--            ></tui-input-file>-->
            <tui-input-file
              link="Choose images"
              accept="image/*"
              formControlName="files"
              [multiple]="true"
              [loadingFiles]="(loading$ | async)!"
              [rejectedFiles]="(rejected$ | async)!"
              (rejectedFilesChange)="onRejectedFilesChange($event)"
            ></tui-input-file>
          </tui-root>
        </nb-card-body>
        <nb-card-footer>


          <!--      <tui-input-file ></tui-input-file>-->
          <!--      <input nbInputFile outline type="file" (change)="CreateUser($event)" value="Add photo">-->
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

  private readonly files = new FormControl([ ]);

  signUpForm: FormGroup = new FormGroup({
    firstName: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(128)]),
    lastName: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(128)]),
    summary: new FormControl('', [Validators.maxLength(300)]),
    files: this.files,
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

  private readonly rejectedFiles$ = new Subject<ReadonlyArray<TuiFileLike>>();
  // private readonly files:

  private readonly files$ = this.files.valueChanges.pipe(
    // We start with empty array for pairwise to work immediately
    startWith<readonly File[]>([]),
    pairwise(),
    // We map each emit to newly added files
    map(([prev, cur]) => cur.filter(item => !prev.includes(item))),
    // We use mergeScan + combineLatest to accumulate results in one array
    mergeScan(
      (acc: readonly (RejectedFile | File)[], cur) =>
        combineLatest(
          cur.map(file =>
            this.serverRequest(file).pipe(
              startWith(file),
              takeUntil(
                // Cancel upload if file is removed from control
                this.files.valueChanges.pipe(
                  filter(files => !files.includes(file)),
                ),
              ),
            ),
          ),
          // Filtering out `null` as successfully uploaded files
        ).pipe(map(files => [...acc, ...files.filter(isPresent)])),
      [],
    ),
    // Now we have a shared Observable of currently loading Files and server-rejects
    share(),
  );

  readonly loading$ = this.files$.pipe(
    // We filter out RejectedFiles to remove errors from loading array
    map(files => files.filter(isFile)),
    switchMap(loading =>
      this.files.valueChanges.pipe(
        startWith(this.files.value),
        // We filter out loading items that were removed from control before server responded
        map(value => loading.filter(file => value.includes(file))),
      ),
    ),
    startWith([]),
  );

  // We start with internal changes (i.e. wrong format or size found or user removed existing error message)
  readonly rejected$ = this.rejectedFiles$.pipe(
    switchMap(rejectedFiles =>
      this.files$.pipe(
        // We filter out Files to ignore loading files
        map(files => files.filter(isRejectedFile)),
        // We collect all newly rejected files and previously rejected since we switch mapped
        scan<RejectedFile[]>(
          (previous, current) => [
            ...previous,
            ...current.filter(({file}) => this.files.value.includes(file)),
          ],
          [],
        ),
        // We remove server errored files from control **SIDE EFFECT**
        tap(files => this.removeRejected(files)),
        // Map new RejectedFiles to TuiFileLike with rejection reason
        map(files => files.map(convertRejected)),
        // Combine with currently present rejected files
        map(filtered => [...rejectedFiles, ...filtered]),
      ),
    ),
    startWith([]),
  );


  onRejectedFilesChange(rejectedFiles: ReadonlyArray<TuiFileLike>) {
    this.rejectedFiles$.next(rejectedFiles);
  }

  private removeRejected(rejectedFiles: ReadonlyArray<RejectedFile>) {
    const filtered = this.files.value.filter((file: File) =>
      rejectedFiles.every(rejectedFile => rejectedFile.file !== file),
    );

    if (filtered.length !== this.files.value.length) {
      this.files.setValue(filtered);
    }
  }

  private serverRequest(file: File): Observable<RejectedFile | File | null> {
    const delay = Math.round(Math.random() * 5000 + 500);
    const result =
      delay % 2
        ? null
        : new RejectedFile(file, 'Server responded for odd number of time');

    return timer(delay).pipe(mapTo(result));
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
    const uploadFileTask = this.storage.upload(filePath, this.inputFile?.value[0],);

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
