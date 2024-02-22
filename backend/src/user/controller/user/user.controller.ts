import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from 'src/user/services/user/user.service';
import { user } from 'src/user/model/user.interface';
import { userRights } from 'src/user/model/user-rights.interface';
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('createUser')
  createUser(@Body() userData: user): Promise<any> {
    return this.userService.createUser(userData);
  }

  @Post('userRights')
  userRights(@Body() usersRights: userRights): Promise<any> {
    return this.userService.createRights(usersRights);
  }
}
