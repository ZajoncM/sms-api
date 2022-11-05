import { forwardRef, Module } from '@nestjs/common';
import { Group } from './entities/group.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GroupsResolver } from './groups.resolver';
import { GroupsService } from './groups.service';
import { UsersModule } from 'src/users/users.module';
import { CoursesModule } from 'src/courses/courses.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Group]),
    forwardRef(() => UsersModule),
    forwardRef(() => CoursesModule),
  ],
  providers: [GroupsResolver, GroupsService],
  exports: [GroupsService],
})
export class GroupsModule {}
