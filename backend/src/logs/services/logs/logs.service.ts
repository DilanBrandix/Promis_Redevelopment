import { Injectable } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { LogEntity } from 'src/logs/model/logs.entity';
import { CreateLogDto } from 'src/logs/model/logs.dto';
import { DataSource } from 'typeorm';

@Injectable()
export class LogsService {
  constructor(
    @InjectDataSource('promis-legacy')
    private promisLegacyDataSource: DataSource,
  ) {}

  async createlog(createLogDto: CreateLogDto) {
    return this.promisLegacyDataSource.manager
      .getRepository(LogEntity)
      .save(createLogDto);
  }
}
