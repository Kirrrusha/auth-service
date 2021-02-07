import { Injectable } from '@nestjs/common';
import { ISendMailOptions, MailerService } from '@nestjs-modules/mailer';
import { IMailGunData } from './interfaces/mail.interface';

@Injectable()
export class MailService {

  constructor(private readonly mailerService: MailerService) {}

  send(data: IMailGunData): Promise<ISendMailOptions> {
    return new Promise((res, rej) => {
      this.mailerService
        .sendMail(data).then(body => res(body))
        .catch(error => rej(error));
    });
  }

}
