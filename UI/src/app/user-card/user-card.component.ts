import {Component, inject, Input, OnInit} from '@angular/core';
import {contactDto} from '../model/Contact';
import {ActivatedRoute} from '@angular/router';
import { ContactService } from '../service/contact.service';
import {Observable} from 'rxjs';
import {AngularFireStorage} from '@angular/fire/storage';

@Component({
  selector: 'app-user-card',
  template: `
      <nb-card>
        <nb-card-header>
          {{ user$.first_name}} {{ user$.last_name}}
          <button
          nbButton status="danger"
          (click)="deleteCard(user$.id)"
          ><nb-icon icon="close-outline"></nb-icon></button>
        </nb-card-header>
        <nb-card-body>
          <img
            width="250"
            loading="lazy"
            alt="Random image"
            src="{{user$.img}}"
          >
        </nb-card-body>
        <nb-card-footer>
          <p class="paragraph">{{user$.summary}}</p>
        </nb-card-footer>
      </nb-card>
  `,
  styleUrls: ['./user-card.component.scss'],
})
export class UserCardComponent implements OnInit {

  @Input()
  user$!: contactDto;

  constructor(
              private route: ActivatedRoute,
              private contactService: ContactService,
              private storage: AngularFireStorage) {

  }

  deleteCard(id: any) {
    console.log(id);
    const contactDelete: Promise<any> = this.contactService.deleteContact('speakers/' + id);
    contactDelete
      .then(() => {
      console.log('Remove succeeded.');
    }).catch((error: { message: string; }) => {
        console.log('Remove failed: ' + error.message);
      });
    // console.log("speakersImg/"+ id)
    this.storage.ref('speakersImg/' + id + '/avatar').delete()
      .subscribe(() => {
        console.log('Remove Storage file succeeded.');
      }, error => {
      console.log('Remove Storage file failed: ' + error.message);
    });
  }

  ngOnInit() {
  }
}
