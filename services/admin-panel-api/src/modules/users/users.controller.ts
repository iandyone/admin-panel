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
  Req,
} from '@nestjs/common';

import { CreateUserDto } from './dto/create-user.dto';
import { FindAllUsersDto } from './dto/find-all-users.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';

import { Auth, Roles, UseId } from '../../decorators';
import { JoiValidationPipe } from '../../pipes/joi-validation.pipe';
import { UserAuthDtoProps } from '../../types';
import {
  createUserSchema,
  findAllUsersSchema,
  idSchema,
  updateUserSchema,
} from '../../validations';

@Auth(['ADMIN'])
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @Roles(['MANAGER'])
  @UsePipes(new JoiValidationPipe(findAllUsersSchema))
  async findAll(@Query() findAllUserDto: FindAllUsersDto) {
    const data = await this.usersService.findAll(findAllUserDto);

    return data;
  }

  @Get(':id')
  @Roles(['MANAGER'])
  @UseId()
  async findOne(@Param('id') id: number) {
    return await this.usersService.findOne(id);
  }

  @Post()
  @UsePipes(new JoiValidationPipe(createUserSchema))
  create(@Body() userData: CreateUserDto, @Req() request) {
    const { id: accountId }: UserAuthDtoProps = request['user'];

    return this.usersService.create(userData, accountId);
  }

  @Patch(':id')
  @Roles(['MANAGER'])
  update(
    @Param('id', new JoiValidationPipe(idSchema), ParseIntPipe) id: number,
    @Body(new JoiValidationPipe(updateUserSchema)) updateUserDto: UpdateUserDto,
    @Req() request,
  ) {
    const { id: accountId }: UserAuthDtoProps = request['user'];

    return this.usersService.update({ id, updateUserDto, accountId });
  }

  @Delete(':id')
  @UseId()
  remove(@Param('id') id: number, @Req() request) {
    const { id: accountId }: UserAuthDtoProps = request['user'];

    return this.usersService.remove(id, accountId);
  }
}
