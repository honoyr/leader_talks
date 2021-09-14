import { Component, OnInit } from '@angular/core';
import {ContactService} from "../service/contact.service";
import {contactDto} from "../model/Contact";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  usersList = [];
  placeholders: any = [];
  limit: number = 4;
  lastVisible: any;
  loading = false;

  private static readonly DB_PATH = 'speakers';
  private pageToLoadNext: number = 0;

  constructor(private contactService: ContactService) { }

  loadNext() {
    if (this.loading) { return }
    this.loading = true;
    this.placeholders = new Array(this.limit / 2);
    const segment = this.contactService.getPaginateQuery(UserListComponent.DB_PATH, this.lastVisible, this.limit, this.pageToLoadNext);

    segment.get().subscribe(querySnapshot => {
      this.lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
      if (querySnapshot.docs.length < this.limit) {
        this.limit = querySnapshot.docs.length - 1;
      }
      querySnapshot.forEach(doc => {
        // @ts-ignore
        this.usersList.push(doc.data() as contactDto);
      });
      this.lastVisible ? this.loading = false : this.placeholders = [];
      this.pageToLoadNext++;
    });
  }

  ngOnInit(): void {
  }
}
