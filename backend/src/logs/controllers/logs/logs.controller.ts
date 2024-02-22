import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { LogsService } from 'src/logs/services/logs/logs.service';
import { CreateLogDto } from 'src/logs/model/logs.dto';

@Controller('logs')
export class LogsController {
  constructor(private readonly logsService: LogsService) {}

  @Post()
  create(@Body() createLogDto: CreateLogDto) {
    return this.logsService.createlog(createLogDto);
  }
}
