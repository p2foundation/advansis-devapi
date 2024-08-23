import { Logger } from '@nestjs/common';
import { PAYSWITCH_APIKEY, PAYSWITCH_USERNAME } from 'src/constants';
import { v4 as uuidv4 } from 'uuid';

export class GeneratorUtil {
  static generateTransactionId(prefix: string = 'TXN'): string {
    const timestamp = Date.now().toString(36); // Convert timestamp to a base-36 string
    const randomString = uuidv4().split('-')[0]; // Get a random alphanumeric string
    return `${prefix}-${timestamp}-${randomString}`.toUpperCase();
  }

  static generateMerchantKey(): any {
    // const timestamp = Date.now().toString(36); // Convert timestamp to a base-36 string
    // const randomString = uuidv4().split('-')[0]; // Get a random alphanumeric string
    // return `${prefix}-${timestamp}-${randomString}`.toUpperCase();

    const merchantId = PAYSWITCH_USERNAME;
    const merchantToken = PAYSWITCH_APIKEY;

    const encodedAuth = '' + Buffer.from(merchantId + ':' + merchantToken).toString('base64');
    console.log('encoded string toBase64 Auth ===>');
    console.debug(encodedAuth);

    return encodedAuth;
  }

  static generateTransactionIdPayswitch(prefix: string = 'PSW'): string {
    const timestamp = Date.now().toString(36); // Convert timestamp to a base-36 string
    const randomString = uuidv4().split('-')[0]; // Get a random alphanumeric string
    return `${prefix}-${timestamp}-${randomString}`.toUpperCase();
  }

  static psRandomGeneratedNumber() {
    const logger = new Logger();

    let text = '';
    const possible = '0123456789';
    const date = new Date();
    const day = (date.getDate() < 10 ? '0' : '') + date.getDate();
    const month = ((date.getMonth() + 1) < 10 ? '0' : '') + (date.getMonth() + 1);
    const year = date.getFullYear().toString().substr(2, 2);
    const customDate = '' + month + day + year;
    for (let i = 0; i < 6; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    const transId = text + customDate;
    logger.log('generated random transaction +++ ' + transId);
    return transId;
  }

}