import { Module } from '@nestjs/common';
import { Lesson } from './entities/lesson.entity';
import { LessonsResolver } from './lessons.resolver';
import { LessonsService } from './lessons.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoursesModule } from 'src/courses/courses.module';

@Module({
  imports: [TypeOrmModule.forFeature([Lesson]), CoursesModule],
  providers: [LessonsResolver, LessonsService],
})
export class LessonsModule {}
