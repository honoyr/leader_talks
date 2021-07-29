import {Component, TemplateRef} from '@angular/core';
import { NbDialogRef, NbDialogService} from '@nebular/theme';

@Component({
  selector: 'nb-participant-form',
  template: `
      <nb-card>
        <nb-card-header>
          Add new Speaker
          <nb-icon icon="close-outline" (click)="close()"></nb-icon>
        </nb-card-header>
        <nb-card-body>
          <input #fullName type="text" nbInput fullWidth fieldSize="small" placeholder="Irina Pavlova">
          <textarea #summery nbInput fullWidth placeholder="ex-President of Onexim Sports"></textarea>
          <!--      <app-input-file-drop></app-input-file-drop>-->
        </nb-card-body>
        <nb-card-footer>


          <!--      <tui-input-file ></tui-input-file>-->
          <!--      <input nbInputFile outline type="file" (change)="CreateUser($event)" value="Add photo">-->
          <button nbButton type="file" outline status="danger" (click)="submit({fullName: fullName.value, summery: summery.value})">Create Speaker</button>
        </nb-card-footer>
      </nb-card>
  `,
  styleUrls: ['./participant.component.scss']
})

export class ParticipantComponent {

  constructor(protected dialogRef: NbDialogRef<ParticipantComponent>) {
  }

  close() {
    this.dialogRef.close();
  }

  submit(speaker: object) {
    console.log(speaker);
    this.dialogRef.close(speaker);
  }
}
