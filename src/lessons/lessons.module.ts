import { forwardRef, Module } from '@nestjs/common';
import { Lesson } from './entities/lesson.entity';
import { LessonsResolver } from './lessons.resolver';
import { LessonsService } from './lessons.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoursesModule } from 'src/courses/courses.module';
import { AttendancesModule } from 'src/attendances/attendances.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Lesson]),
    CoursesModule,
    forwardRef(() => AttendancesModule),
  ],
  providers: [LessonsResolver, LessonsService],
  exports: [LessonsService],
})
export class LessonsModule {}
