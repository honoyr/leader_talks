import {UploadFileService} from "./uploadFile.service"

export class ParticipantAvatarService {

  private static readonly PARTICIPANT_PATH = 'speakersImg/';

  constructor(uloadFile: UploadFileService) {
    this.ParticipantAvatarService.set(PARTICIPANT_PATH));
  }


}
