import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {ContactService} from "../service/contact.service";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  usersList = [];
  placeholders: any = [];
  limit: number = 15;
  lastVisible: any;
  loading = false;

  private static readonly DB_PATH = 'speakers';
  private pageToLoadNext: number = 0;


  constructor(private contactService: ContactService) { }

  loadNext() {
    if (this.loading) { return }

    this.loading = true;

    this.placeholders = new Array(this.limit);
      this.contactService.getPaginateQuery(UserListComponent.DB_PATH, this.lastVisible, this.limit, this.pageToLoadNext)
        .valueChanges()
        .subscribe(users => {
          this.placeholders = [];
          // @ts-ignore
          this.usersList.push(...users);
          this.loading = false;
          this.lastVisible = this.usersList[users.length - 1];
          this.pageToLoadNext++;
        })
  }

  ngOnInit(): void {
  }

}
