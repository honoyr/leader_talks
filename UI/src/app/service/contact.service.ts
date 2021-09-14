import { Injectable } from '@angular/core';
import {AngularFirestore, DocumentReference} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import {Contact, contactDto} from "../model/Contact";
import {ResizeImages, ResizeImagesDto} from "../model/ResizeImages";
// import {Query} from "firebase";


@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private  db: AngularFirestore;

  protected constructor(firestore: AngularFirestore) {
    this.db = firestore;
  }

  createContact(contact: Contact, path: string, url?: string) : Promise<DocumentReference<unknown>> {
    contact.img = url ? url: "";

    const dto: contactDto = {
      first_name: contact.firstName,
      last_name: contact.lastName,
      summary: contact.summary,
      img: contact.img,
      bucketFilePath: "contact.bucketFilePath",
      timestamp: contact.timestamp
   };
    console.log(dto);
    return this.db.collection(path).add(dto);
  }

  updateContact(contact: Contact, path: string) {
    const dto: contactDto = this.parseDto(contact);
    return this.db.doc(`/${path}/${contact.id}`).set(dto);
  }

  parseDto(contact: Contact){
    const avatarDto: ResizeImagesDto = this.getAvatarDto(contact.avatar);
    // console.log(avatarDto);
    const dto: contactDto = {
      first_name: contact.firstName,
      last_name: contact.lastName,
      summary: contact.summary,
      img: contact.img,
      avatar: avatarDto,
      bucketFilePath: contact.bucketFilePath,
      timestamp: contact.timestamp
    };

    return dto;
  }

  getAvatarDto(avatar: ResizeImages) {
    const avatarDto: ResizeImagesDto = {
      original: avatar.original,
      filePath: avatar.filePath
    }
    return avatarDto;
  }

  getContactList(path: string) {
    return this.db.collection(path);
  }

  getPaginateQuery(path: string, lastVisible: any, limit: number, pageToLoadNext: number) {
    if (pageToLoadNext === 0) {
      // console.log(lastVisible);
      return this.db.collection(path, ref => ref.orderBy("timestamp").limit(limit));
    } else {
      // console.log(lastVisible);
      return this.db.collection(path, ref => ref.orderBy("timestamp").startAfter(lastVisible).limit(limit));
    }
  }
}


