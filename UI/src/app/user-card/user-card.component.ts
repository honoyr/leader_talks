import {Component, Input, OnInit} from '@angular/core';
import {contactDto} from "../model/Contact";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-user-card',
  template: `
      <nb-card>
        <nb-card-header>
          {{ user$.first_name}} {{ user$.last_name}}
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
