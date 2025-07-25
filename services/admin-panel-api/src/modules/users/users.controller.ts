import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  ParseIntPipe,
  Body,
  Patch,
  UsePipes,
} from '@nestjs/common';
import { Credentials, User } from '@prisma/client';

import { UsersService } from './users.service';

import { JoiValidationPipe } from '../../pipes/joi-validation.pipe';
import { idSchema } from '../../validations/common.schema';
import {
  createUserSchema,
  updateUserSchema,
} from '../../validations/user.schema';
import { UseId } from '../decorators';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @UsePipes(new JoiValidationPipe(createUserSchema))
  create(
    @Body()
    userData: User & Credentials,
  ) {
    return this.usersService.create(userData);
  }

  @Get()
  async findAll() {
    return await this.usersService.findAll();
  }

  @Get(':id')
  @UseId()
  async findOne(@Param('id') id: number) {
    return await this.usersService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', new JoiValidationPipe(idSchema), ParseIntPipe) id: number,
    @Body(new JoiValidationPipe(updateUserSchema)) user: User,
  ) {
    return this.usersService.update(id, user);
  }

  @Delete(':id')
  @UseId()
  remove(@Param('id') id: number) {
    return this.usersService.remove(id);
  }
}
