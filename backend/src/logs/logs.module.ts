import { Module } from '@nestjs/common';
import { LogsController } from './controllers/logs/logs.controller';
import { LogsService } from './services/logs/logs.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LogEntity } from './model/logs.entity';

@Module({
  imports: [TypeOrmModule.forFeature([LogEntity], 'promis-legacy')],
  controllers: [LogsController],
  providers: [LogsService],
  exports: [LogsService],
})
export class LogsModule {}
