export class ResizeImages {

  public small!: string;

  public medium!: string;

  public large!: string;

  public extraL!: string;

  public huge!: string;

  public original!: string;

  public filePath!: string;

  constructor() {
  }


}

export interface ResizeImagesDto {
  original: string;

  filePath: string;
}
