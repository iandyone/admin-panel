import { Injectable } from '@nestjs/common';

import { DatabaseService } from '../database/database.service';

@Injectable()
export class EmployeeService {
  constructor(private readonly db: DatabaseService) {}

  async getEmployees() {
    const { managers, deliveryman } = await this.db.getEmployees();

    const response = {
      managers: managers.map(({ id, firstName, lastName, Credentials }) => ({
        id,
        name: `${firstName} ${lastName}`,
        role: Credentials.role,
      })),
      deliveryman: deliveryman.map(
        ({ id, firstName, lastName, Credentials }) => ({
          id,
          name: `${firstName} ${lastName}`,
          role: Credentials.role,
        }),
      ),
    };

    return response;
  }
}
