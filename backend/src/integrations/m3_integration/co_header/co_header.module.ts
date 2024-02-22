import { Module } from '@nestjs/common';
import { CoHeaderController } from './controllers/co_header/co_header.controller';
import { CoHeaderService } from './services/co_header/co_header.service';
import { LogsService } from 'src/logs/services/logs/logs.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LogEntity } from 'src/logs/model/logs.entity';
import { coHeader } from './model/co-header.entity';
import { scheduleOperation } from './model/schedule-operation.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature(
      [LogEntity, coHeader, scheduleOperation],
      'promis-legacy',
    ),
    // can use like this as well - TypeOrmModule.forFeature([coHeader], 'promis-legacy'),
  ],
  controllers: [CoHeaderController],
  providers: [CoHeaderService, LogsService],
})
export class CoHeaderModule {}
