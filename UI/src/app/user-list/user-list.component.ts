import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {ContactService} from "../service/contact.service";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  usersList$: Observable<any[]>;
  placeholders = [];
  limit = 10;
  lastVisible = 1;
  loading = false;
  private static readonly DB_PATH = 'speakers';

  constructor(private contactService: ContactService) { }

  loadNext() {
    if (this.loading) { return }

    this.loading = true;
    // @ts-ignore
    this.placeholders = new Array(this.pageSize);

    this.contactService.getContactList(UserListComponent.DB_PATH, this.lastVisible, this.limit)
      .subscribe(users => {
        this.placeholders = [];
        // @ts-ignore
        this.usersList.push(...users);
        this.loading = false;
        this.pageToLoadNext++;
      });
  }

  var first = db.collection("cities")
    .orderBy("population")
    .limit(25);

  return first.get().then((documentSnapshots) => {
  // Get the last visible document
  var lastVisible = documentSnapshots.docs[documentSnapshots.docs.length-1];
  console.log("last", lastVisible);

  // Construct a new query starting at this document,
  // get the next 25 cities.
  var next = db.collection("cities")
    .orderBy("population")
    .startAfter(lastVisible)
    .limit(25);
});

  ngOnInit(): void {
  }

}
