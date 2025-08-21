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

import { CreateUserDto } from './dto/create-user.dto';
import { FindAllUsersDto } from './dto/find-all-users.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';

import { UseId } from '../../decorators';
import { JoiValidationPipe } from '../../pipes/joi-validation.pipe';
import {
  createUserSchema,
  findAllUsersSchema,
  idSchema,
  updateUserSchema,
} from '../../validations';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @UsePipes(new JoiValidationPipe(findAllUsersSchema))
  async findAll(@Query() findAllUserDto: FindAllUsersDto) {
    return await this.usersService.findAll(findAllUserDto);
  }

  @Get(':id')
  @UseId()
  async findOne(@Param('id') id: number) {
    return await this.usersService.findOne(id);
  }

  @Post()
  @UsePipes(new JoiValidationPipe(createUserSchema))
  create(@Body() userData: CreateUserDto) {
    return this.usersService.create(userData);
  }

  @Patch(':id')
  update(
    @Param('id', new JoiValidationPipe(idSchema), ParseIntPipe) id: number,
    @Body(new JoiValidationPipe(updateUserSchema)) user: UpdateUserDto,
  ) {
    return this.usersService.update(id, user);
  }

  @Delete(':id')
  @UseId()
  remove(@Param('id') id: number) {
    return this.usersService.remove(id);
  }
}
