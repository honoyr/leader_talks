import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { NbMenuItem } from '@nebular/theme';

@Component({
  selector: 'app-menu',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  constructor() { }

  items: NbMenuItem[] = [
    {
      title: 'Home',
      icon: 'home-outline',
      link: ''
    },
    {
      title: 'Join',
      icon: 'person-outline',
      url: 'https://docs.google.com/forms/d/e/1FAIpQLSdzOpoBBl0cNQ9J3NLZKeEP9mLHr5N5UF7lUkwMyQFBQm4xmQ/viewform?fbclid=IwAR3npvSbpsDmzC6HzgFXNB0iGEGlyuVB98ajxiAN5V2iJb1jTOyiidjuD98'
    },
    {
      title: 'log in',
      icon: 'lock-outline',
      link: 'auth'
    },
  ];

  ngOnInit(): void {
  }

}
