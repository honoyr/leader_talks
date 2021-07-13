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
      title: 'Profile',
      icon: 'person-outline',
      link: 'auth'
    },
    {
      title: 'Change Password',
      icon: 'lock-outline',
    },
    {
      title: 'Privacy Policy',
      icon: { icon: 'checkmark-outline', pack: 'eva' },
      link: 'auth'
    },
    {
      title: 'Logout',
      icon: 'unlock-outline',
      link: 'auth'
    },
  ];

  ngOnInit(): void {
  }

}
