import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoursesModule } from 'src/courses/courses.module';
import { Exam } from './entities/exam.entity';
import { ExamsResolver } from './exams.resolver';
import { ExamsService } from './exams.service';

@Module({
  imports: [TypeOrmModule.forFeature([Exam]), CoursesModule],
  providers: [ExamsResolver, ExamsService],
})
export class ExamsModule {}
