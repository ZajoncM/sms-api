import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  private readonly users: User[] = [
    {
      id: 1,
      email: 'john',
      password: 'changeme',
      firstName: '',
      lastName: '',
    },
    {
      id: 2,
      email: 'maria',
      password: 'guess',
      firstName: '',
      lastName: '',
    },
  ];

  create(createUserInput: CreateUserInput) {
    return this.users[0];
  }

  findAll() {
    return this.users;
  }

  findOne(email: string) {
    return this.users.find((user) => user.email === email);
  }

  update(id: number, updateUserInput: UpdateUserInput) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
