import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserInput: CreateUserInput) {
    const user = await this.usersRepository.create(createUserInput);

    return user.save();
  }

  async findAll(userDto?: UpdateUserInput) {
    return this.usersRepository.findBy({ ...userDto });
  }

  async findOne(userDto: UpdateUserInput) {
    return this.usersRepository.findOneBy({ ...userDto });
  }

  async update(id: number, updateUserInput: UpdateUserInput) {
    await this.usersRepository.update(id, { ...updateUserInput });

    return this.findOne({ id });
  }

  async remove(id: number) {
    const user = await this.findOne({ id });

    const deletedUser = user.remove();

    return { ...deletedUser, id };
  }
}
