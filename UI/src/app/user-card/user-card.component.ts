import {Component, Input, OnInit} from '@angular/core';
import {UserService} from "../service/users.service";
import {contactDto} from "../model/Contact";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-user-card',
  template: `<!--<h2>{{ user$.first_name}} {{ user$.last_name}}</h2>-->
<!--  <p>{{user$.summary}}</p>-->
<!--  <img-->
<!--    width="250"-->
<!--    loading="lazy"-->
<!--    alt="Random image"-->
<!--    src="{{user$.img}}"-->
<!--  >-->
  <nb-flip-card >
    <nb-card-front>
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
      </nb-card>
    </nb-card-front>
    <nb-card-back>
      <nb-card>
        <nb-card-body>
          <p class="paragraph">{{user$.summary}}</p>
        </nb-card-body>
      </nb-card>
    </nb-card-back>
  </nb-flip-card>
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
