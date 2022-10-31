import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { find } from 'rxjs';
import { Student } from 'src/users/entities/student.entity';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { CreateLessonInput } from './dto/create-lesson.input';
import { UpdateLessonInput } from './dto/update-lesson.input';
import { Lesson } from './entities/lesson.entity';

@Injectable()
export class LessonsService {
  constructor(
    @InjectRepository(Lesson)
    private readonly lessonRepository: Repository<Lesson>,
  ) {}

  async create(createLessonInput: CreateLessonInput) {
    const lesson = await this.lessonRepository.create({
      ...createLessonInput,
    });

    return lesson.save();
  }

  async findAll() {
    return this.lessonRepository.find();
  }

  async findOne(id: number) {
    return this.lessonRepository.findOne({
      where: { id },
    });
  }

  async update(id: number, updateLessonInput: UpdateLessonInput) {
    await this.lessonRepository.update(id, { ...updateLessonInput });

    return this.findOne(id);
  }

  async remove(id: number) {
    const lesson = await this.findOne(id);

    const deletedLesson = await lesson.remove();

    return { ...deletedLesson, id };
  }
}
