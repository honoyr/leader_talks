import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject} from '@angular/core';
import {TuiDestroyService, watch} from '@taiga-ui/cdk';
import {TuiNotificationsService} from '@taiga-ui/core';
import {TuiFileLike} from '@taiga-ui/kit';
import {combineLatest, Observable, Subject, timer} from 'rxjs';
import {finalize, mapTo, startWith, switchMap, takeUntil} from 'rxjs/operators';
import {PhotoService} from "../service/photo.service";
// import * as console from "console";

// import { AngularFirestore } from '@angular/fire/firestore';
// import { AngularFireStorage } from '@angular/fire/storage';


class RejectedFile {
  constructor(readonly file: TuiFileLike, readonly reason: string) {}
}

function isRejectedFile(file: any): file is RejectedFile {
  return file instanceof RejectedFile;
}

function getRemoved<T>(oldArray: ReadonlyArray<T>, newArray: ReadonlyArray<T>): T | null {
  const filtered = oldArray.filter(item => newArray.indexOf(item) === -1);

  return filtered.length === 1 ? filtered[0] : null;
}

function isNarrowed<T>(oldArray: ReadonlyArray<T>, newArray: ReadonlyArray<T>): boolean {
  return newArray.every(item => oldArray.indexOf(item) !== -1);
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
  selector: 'app-input-file-drop',
  templateUrl: './input-file-drop.component.html',
  styleUrls: ['./input-file-drop.component.scss'],
  providers: [TuiDestroyService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class InputFileDropComponent {
  files: ReadonlyArray<TuiFileLike> = [ ];
  loadingFiles: ReadonlyArray<TuiFileLike> = [this.files[0]];
  rejectedFiles: ReadonlyArray<TuiFileLike> = [ ];

  // db: AngularFirestore;
  // storage: AngularFireStorage;
  private static readonly STORAGE_PATH = 'speakersImg/';
  private readonly files$ = new Subject<ReadonlyArray<TuiFileLike>>();

  constructor(
    @Inject(TuiDestroyService) destroy$: TuiDestroyService,
    @Inject(ChangeDetectorRef) changeDetectorRef: ChangeDetectorRef,
    @Inject(TuiNotificationsService)
    private readonly notificationsService: TuiNotificationsService,
    private photoService: PhotoService,
    // firestore: AngularFirestore,
    // firestoreStorage: AngularFireStorage
  ) {
    this.files$
      .pipe(
        takeUntil(destroy$),
        switchMap(files =>
          combineLatest(
            files.map(file => this.serverRequest(file).pipe(startWith(file))),
          ),
        ),
        watch(changeDetectorRef),
      )
      .subscribe(response => {
        this.processResponse(response);
      });
    // this.db = firestore;
    // this.storage = firestoreStorage;
  }

  // get getFile() : TuiFileLike {
  //
  //   return this.files[0];
  // }
  //
  // get getFils() : TuiFileLike[] {
  //
  //   return this.files;
  // }

  onModelChange(files: ReadonlyArray<TuiFileLike>) {
    this.processNotification(files);

    if (isNarrowed(this.files, files)) {
      this.files = files;
      this.loadingFiles = this.loadingFiles.filter(
        file => files.indexOf(file) !== -1,
      );

      return;
    }

    this.files = files;
    this.loadingFiles = this.files;
    this.files$.next(this.files);
    // console.log(this.files);
    // console.log(this.loadingFiles);
    // this.photoService.uploadFile(this.files[0], InputFileDropComponent.STORAGE_PATH);
  }

  private processNotification(files: ReadonlyArray<TuiFileLike>) {
    const removed = getRemoved(this.files, files);

    if (removed) {
      this.notificationsService.show(`"${removed.name}" was removed`).subscribe();
    }
  }

  private processResponse(files: ReadonlyArray<RejectedFile | TuiFileLike | null>) {
    this.loadingFiles = this.loadingFiles.filter(file => files.indexOf(file) !== -1);

    const newRejectedFiles = files
      .filter(isRejectedFile)
      .filter(({file}) => this.files.indexOf(file) !== -1);

    if (newRejectedFiles.length === 0) {
      return;
    }

    this.rejectedFiles = [
      ...this.rejectedFiles,
      ...newRejectedFiles.map(convertRejected),
    ];
    this.files = this.files.filter(file =>
      newRejectedFiles.every(rejectedFile => rejectedFile.file !== file),
    );
  }

  private serverRequest(file: TuiFileLike): Observable<RejectedFile | File | null> {
    const delay = Math.round(Math.random() * 5000 + 500);
    const result =
      delay % 2
        ? null
        : new RejectedFile(file, 'Server responded for odd number of time');

    return timer(delay).pipe(mapTo(result));
  }

}
