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

  updateContact(contact: Contact, path: string) {
    const dto: contactDto = this.parseDto(contact);
    return this.db.doc(`/${path}/${contact.id}`).set(dto);
  }

  parseDto(contact: Contact){
    // console.log(contact.avatar.original);
    // console.log(contact.avatar.filePath);
    // const avatarDto: ResizeImagesDto = {
    //   original: contact.avatar.original,
    //   filePath: contact.avatar.filePath
    // }
    const avatarDto: ResizeImagesDto = this.getAvatarDto(contact.avatar);
    // console.log(avatarDto);
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
    // console.log(`avatarDPO = ${avatarDto}`);
    // console.log(`avatarDPO = ${avatarDto.toString()}`);
    return avatarDto;
  }

}
