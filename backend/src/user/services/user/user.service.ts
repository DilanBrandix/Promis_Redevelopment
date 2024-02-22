import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { UsersEntity } from 'src/user/model/users.entity';
import { UserRightsEntity } from 'src/user/model/user-rights.entity';
import { userRights } from 'src/user/model/user-rights.interface';
import { user } from 'src/user/model/user.interface';
import { ModuleEntity } from 'src/user/model/module.entity';
@Injectable()
export class UserService {
  constructor(
    @InjectDataSource('promis-legacy')
    private promisLegacyDataSource: DataSource,
  ) {}

  async createUser(users: user) {
    const user = await this.promisLegacyDataSource.manager
      .getRepository(UsersEntity)
      .save(users);

    return user;
  }

  async createRights(usersRights: userRights) {
    const moduleName: any = usersRights.moduleID;
    const module = await this.promisLegacyDataSource.query(
      `SELECT [id]
      ,[module]
      FROM [ProMIS_SX].[dbo].[module] where module ='${moduleName}'`,
    );

    // const rights: userRights = {
    //   username: usersRights.username,
    //   moduleID: ,
    //   subModuleID: ,
    //   rights: 1,
    // };

    // const useraccess = await this.promisLegacyDataSource.manager
    //   .getRepository(UserRightsEntity)
    //   .save(usersRights);
    console.log(moduleName);
    return module;
  }
}
