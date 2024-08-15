import { Injectable } from '@nestjs/common';
import { Twilio } from 'twilio';

@Injectable()
export class SmsService {
  private client: Twilio;

  constructor() {
    this.client = new Twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_TOKEN);
  }

  async sendSms(to: string, body: string) {
    return this.client.messages.create({
      body,
      from: '233244588584',
      to,
    });
  }
}
