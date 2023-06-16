import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { getMailConfig } from '@guitar-shop/core';
import { MailService } from './mail.service';

@Module({
  imports: [
    MailerModule.forRootAsync(getMailConfig())
  ],
  providers: [MailService],
  exports: [MailService]
})
export class MailModule { }
