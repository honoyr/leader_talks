import { Injectable } from '@angular/core';
import {AngularFirestore, DocumentReference} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import {Contact, contactDto} from "../model/Contact";
import {ResizeImages, ResizeImagesDto} from "../model/ResizeImages";


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
      bucketFilePath: "contact.bucketFilePath"
   };
    console.log(dto);
    return this.db.collection(path).add(dto);
  }

  updateContact(contact: Contact) {

    const dto: contactDto = this.parseDto(contact);
    console.log(dto);
    console.log("Type in update contact" + typeof dto);
   return this.db.doc(`/speakers/${contact.id}`).set(dto);
  }

  parseDto(contact: Contact){
    console.log(contact.avatar.original);
    console.log(contact.avatar.filePath);
    const avatarDto: ResizeImagesDto = {
      original: contact.avatar.original,
      filePath: contact.avatar.filePath
    }
    // const avatar: string = this.getAvatarDto(contact.avatar);
    console.log(avatarDto);
    const dto: contactDto = {
      first_name: contact.firstName,
      last_name: contact.lastName,
      summary: contact.summary,
      img: contact.img,
      avatar: avatarDto,
      bucketFilePath: contact.bucketFilePath
    };

    return dto;
  }

  getAvatarDto(avatar: ResizeImages) {
    const avatarDto: ResizeImagesDto = {
      original: avatar.original,
      filePath: avatar.filePath
    }
    console.log(`avatarDPO = ${avatarDto}`);
    console.log(`avatarDPO = ${avatarDto.toString()}`);
    return avatarDto.toString();
  }
  // addUserData(user: object, DBpath: string,){
  //
  //   this.db.collection(DBpath).add(user).then((docRef) => {
  //     console.log("Document written with ID: ", docRef.id);
  //   })
  //     .catch((error) => {
  //       console.error("Error adding document: ", error);
  //     });
  // }

  // static createContact(contact: Contact, DB_PATH: string) {
  //
  // }
}
