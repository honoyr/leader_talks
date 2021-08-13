import {Component, Input, OnInit} from '@angular/core';
import {UserService} from "../service/users.service";
import {contactDto} from "../model/Contact";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-user-card',
  template: `<h2>{{ user$.first_name}} {{ user$.last_name}}</h2>
  <p>{{user$.summary}}</p>
  <img
    width="250"
    loading="lazy"
    alt="Random image"
    src="{{user$.img}}"
  >
  `,
  styleUrls: ['./user-card.component.scss']
})
export class UserCardComponent implements OnInit {

  @Input()
  user$!: contactDto;

  constructor(private route: ActivatedRoute) {

  }

  ngOnInit() {
  }
}
