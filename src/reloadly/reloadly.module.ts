import { Module } from '@nestjs/common';
import { ReloadlyController } from './reloadly.controller';
import { ReloadlyService } from "./reloadly.service";
import { HttpModule } from "@nestjs/axios";

@Module({
  imports: [HttpModule],
  controllers: [ReloadlyController],
  providers: [ReloadlyService, ]
})
export class ReloadlyModule {}
