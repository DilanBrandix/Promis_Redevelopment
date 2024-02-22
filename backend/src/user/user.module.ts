/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { UserController } from './controller/user/user.controller';
import { UserService } from './services/user/user.service';
import { UsersEntity } from './model/users.entity';
import { UserRightsEntity } from './model/user-rights.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ModuleEntity } from './model/module.entity';
@Module({
  imports: [TypeOrmModule.forFeature([UsersEntity, UserRightsEntity, ModuleEntity], 'promis-legacy')],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UsersModule {}
