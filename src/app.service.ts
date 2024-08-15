import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  constructor(
    @Inject('APP_NAME') 
    private readonly appName: string,
  ) {
  }
  
  getHello(): string {
    // console.log(process.env);
    return `いらっしゃいませ to ${this.appName}`;
  }
}
