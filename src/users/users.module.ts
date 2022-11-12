import { forwardRef, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

import { Student } from './entities/student.entity';
import { Teacher } from './entities/teacher.entity';
import { CoursesModule } from 'src/courses/courses.module';
import { Parent } from './entities/parent.entity';
import { ParentsResolver } from './parents.resolver';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Parent, Student, Teacher]),
    forwardRef(() => CoursesModule),
  ],
  providers: [UsersResolver, UsersService, ParentsResolver],
  exports: [UsersService],
})
export class UsersModule {}
