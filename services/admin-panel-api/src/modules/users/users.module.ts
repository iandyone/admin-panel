import { Module } from '@nestjs/common';

import { EmployeeController } from './employee.controller';
import { EmployeeService } from './employee.service';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  controllers: [UsersController, EmployeeController],
  providers: [UsersService, EmployeeService],
  exports: [UsersService, EmployeeService],
})
export class UsersModule {}
