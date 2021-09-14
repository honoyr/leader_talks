import { Component, HostBinding } from '@angular/core';


@Component({
  selector: 'app-user-card-placeholder',
  template: `
    <nb-card>
      <nb-card-header>
        <div class="title-placeholder"></div>
      </nb-card-header>
      <nb-card-body>
        <div class="text-placeholder"></div>
      </nb-card-body>
      <nb-card-footer>
        <div class="link-placeholder"></div>
      </nb-card-footer>
    </nb-card>
  `,
  styleUrls: [ './user-card-placegolder.component.scss' ],
})
export class UserCardPlaceholderComponent {
  @HostBinding('attr.aria-label')
  label = 'Loading';
}
