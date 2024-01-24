import { Module } from '@nestjs/common';
import { CoHeaderController } from './controllers/co_header/co_header.controller';
import { CoHeaderService } from './services/co_header/co_header.service';

@Module({
  controllers: [CoHeaderController],
  providers: [CoHeaderService],
})
export class CoHeaderModule {}
