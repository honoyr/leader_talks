import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { delay, map } from 'rxjs/operators';
// import { getFirestore } from "firebase/firestore"

const TOTAL_PAGES = 7;

export class NewsPost {
  title!: string;
  link!: string;
  creator!: string;
  text!: string;

}

@Injectable()
export class NewsService {

  constructor(private http: HttpClient) {}

  load(page: number, pageSize: number): Observable<NewsPost[]> {
    const startIndex = ((page - 1) % TOTAL_PAGES) * pageSize;

    return this.http
      .get<NewsPost[]>('https://akveo.github.io/nebular/assets/data/news.json')
      .pipe(
        map(news => news.splice(startIndex, pageSize)),
        delay(1500),
      );
  }
}

// export class UserService {
//   db: getFirestore;
//
//   constructor() {
//     this.db = getFirestore();
//   }
//
//   load(page: number, pageSize: number): Observable<NewsPost[]> {
//     const startIndex = ((page - 1) % TOTAL_PAGES) * pageSize;
//
//     return this.http
//       .get<NewsPost[]>('https://akveo.github.io/nebular/assets/data/news.json')
//       .pipe(
//         map(news => news.splice(startIndex, pageSize)),
//         delay(1500),
//       );
//   }
// }
