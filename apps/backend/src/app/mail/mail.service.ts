import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MailerService } from '@nestjs-modules/mailer';
import { Order, User } from '@guitar-shop/shared-types';
import { EmailSubject } from './mail.constant';
import { UserEntity } from '../users/user.entity';

@Injectable()
export class MailService {
  constructor(
    private readonly mailerService: MailerService,
    private readonly configService: ConfigService,
  ) { }

  public async sendNotifyNewUser(user: UserEntity) {
    await this.mailerService.sendMail({
      to: user.email,
      subject: EmailSubject.EMAIL_ADD_NEW_USER_SUBJECT,
      template: './add-new-user',
      context: {
        user: `${user.name}`,
        email: `${user.email}`,
        password: `${user.origin}`,
        url:`${this.configService.get<string>('frontendUrl.host')}`,
      }
    })
  }

  public async sendNotifyNewOrder(admin: UserEntity, order: Order) {
    console.log(admin)
    await this.mailerService.sendMail({
      to: admin.email,
      subject: EmailSubject.EMAIL_ADD_NEW_ORDER_SUBJECT,
      template: './add-new-order',
      context: {
        admin: `${admin.name}`,
        order: `${order}`,
      }
    })
  }
}
