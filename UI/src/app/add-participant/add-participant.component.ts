import {Component, OnInit, TemplateRef} from '@angular/core';
import {NbDialogService} from "@nebular/theme";
import {ParticipantComponent} from "./components/participant.component";
import {ContactService} from "../service/contact.service";


@Component({
  selector: 'app-add-participant',
  templateUrl: './add-participant.component.html',
  styleUrls: ['./add-participant.component.scss']
})
export class AddParticipantComponent implements OnInit {

  private static readonly DB_PATH = 'speakers';
  constructor(private dialogService: NbDialogService) { }


  open() {
    this.dialogService.open(ParticipantComponent)
      .onClose.subscribe(contact => {
      // ContactService.createContact(contact, AddParticipantComponent.DB_PATH);
      console.log(`open = ${contact}`);
    });
  }

  ngOnInit(): void {
  }

}
