import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Parent } from '@nestjs/graphql';
import { Student } from './entities/student.entity';
import { Teacher } from './entities/teacher.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Parent, Student, Teacher])],
  providers: [UsersResolver, UsersService],
  exports: [UsersService],
})
export class UsersModule {}
