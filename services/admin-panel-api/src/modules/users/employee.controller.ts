import { Controller, Get } from '@nestjs/common';

import { EmployeeService } from './employee.service';

import { Auth } from '../../decorators';

@Auth()
@Controller('employee')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Get()
  findAll() {
    return this.employeeService.getEmployees();
  }
}
