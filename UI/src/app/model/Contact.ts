import {ResizeImages, ResizeImagesDto} from "./ResizeImages";

export class Contact {

  public id!: string;

  public firstName!: string;

  public lastName!: string;

  public email!: string;

  public img!: string;

  public bucketFilePath!: string;

  public avatar!: ResizeImages;

  public organization!: string;

  public planId!: string;

  public password!: string;

  public provider!: string;

  public summary!: string;

  public timestamp!: number;

  constructor() {
    this.timestamp = Date.now();
  }

  public getAvatarLetters() {
    let avatarLetters = (this.firstName ? this.firstName[0] : '') + (this.lastName ? this.lastName[0] : '');

    if (!avatarLetters) {
      avatarLetters = 'U';
    }

    return avatarLetters.toUpperCase();
  }

  // public setPicture(url: string | undefined) {
  //   this.picture = url;
  // }

}

export interface contactDto {

  id?: string;

  first_name: string;

  last_name: string;

  email?: string;

  img?: string;

  bucketFilePath?: string;

  avatar?: ResizeImagesDto;

  organization?: string;

  plan_id?: string;

  summary: string;

  timestamp: number;

  serverTime?: any;

}

