import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoursesModule } from 'src/courses/courses.module';
import { GradesModule } from 'src/grades/grades.module';
import { Exam } from './entities/exam.entity';
import { ExamsResolver } from './exams.resolver';
import { ExamsService } from './exams.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Exam]),
    forwardRef(() => CoursesModule),
    forwardRef(() => GradesModule),
  ],
  providers: [ExamsResolver, ExamsService],
  exports: [ExamsService],
})
export class ExamsModule {}
