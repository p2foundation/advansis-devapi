import { Injectable } from '@nestjs/common';
import { TWILIO_ACCOUNT_SID, TWILIO_TOKEN } from 'src/constants';
import { Twilio } from 'twilio';

@Injectable()
export class SmsService {
  private client: Twilio;
  private ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID || TWILIO_ACCOUNT_SID;
  private AUTH_TOKEN = process.env.TWILIO_TOKEN || TWILIO_TOKEN;

  constructor() {
    this.client = new Twilio(this.ACCOUNT_SID, this.AUTH_TOKEN);
  }

  async sendSms(to: string, body: string) {
    return this.client.messages.create({
      body,
      from: '233244588584',
      to,
    });
  }
}
