import { forwardRef, Module } from '@nestjs/common';
import { Course } from './entities/course.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoursesResolver } from './courses.resolver';
import { CoursesService } from './courses.service';
import { GroupsModule } from 'src/groups/groups.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Course]),
    forwardRef(() => GroupsModule),
    UsersModule,
  ],
  providers: [CoursesResolver, CoursesService],
  exports: [CoursesService],
})
export class CoursesModule {}
