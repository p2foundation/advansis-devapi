import { Module } from '@nestjs/common';
import { ReloadAirtimeService } from './reload-airtime.service';
import { ReloadAirtimeController } from './reload-airtime.controller';
import { HttpModule } from "@nestjs/axios";

@Module({
  imports: [HttpModule],
  controllers: [ReloadAirtimeController],
  providers: [ReloadAirtimeService]

})
export class ReloadAirtimeModule {

}
