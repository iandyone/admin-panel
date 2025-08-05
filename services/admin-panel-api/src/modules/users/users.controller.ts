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
  Query,
} from '@nestjs/common';
import { Credentials, User } from '@prisma/client';
import { UsersFindAllProps } from 'src/types';

import { UsersService } from './users.service';

import { JoiValidationPipe } from '../../pipes/joi-validation.pipe';
import {
  createUserSchema,
  findAllUserSchema,
  idSchema,
  updateUserSchema,
} from '../../validations';
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
  @UsePipes(new JoiValidationPipe(findAllUserSchema))
  async findAll(@Query() query: UsersFindAllProps) {
    return await this.usersService.findAll(query);
  }

  @Get(':id')
  @UseId()
  async findOne(@Param('id') id: number) {
    return await this.usersService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', new JoiValidationPipe(idSchema), ParseIntPipe) id: number,
    @Body(new JoiValidationPipe(updateUserSchema))
    user: User & { role: string },
  ) {
    return this.usersService.update(id, user);
  }

  @Delete(':id')
  @UseId()
  remove(@Param('id') id: number) {
    return this.usersService.remove(id);
  }
}
