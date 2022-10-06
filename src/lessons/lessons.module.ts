import { Module } from '@nestjs/common';
import { Lesson } from './entities/lesson.entity';
import { LessonsResolver } from './lessons.resolver';
import { LessonsService } from './lessons.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Lesson])],
  providers: [LessonsResolver, LessonsService],
})
export class LessonsModule {}
