import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CoursesService } from 'src/courses/courses.service';
import { Repository } from 'typeorm';
import { CreateLessonInput } from './dto/create-lesson.input';
import { UpdateLessonInput } from './dto/update-lesson.input';
import { Lesson } from './entities/lesson.entity';

@Injectable()
export class LessonsService {
  constructor(
    @InjectRepository(Lesson)
    private readonly lessonRepository: Repository<Lesson>,
    private readonly coursesService: CoursesService,
  ) {}

  async create(createLessonInput: CreateLessonInput) {
    const { courseId, ...rest } = createLessonInput;

    const course = await this.coursesService.findOne(Number(courseId));

    const lesson = await this.lessonRepository.create({
      ...rest,
      course,
    });

    return lesson.save();
  }

  async findAll(lessonDto: UpdateLessonInput) {
    const { courseId, ...rest } = lessonDto;

    return this.lessonRepository.find({
      where: { ...rest, course: { id: Number(courseId) } },
      order: { id: 'ASC' },
    });
  }

  async findOne(id: number) {
    return this.lessonRepository.findOne({
      where: { id },
    });
  }

  async update(id: number, updateLessonInput: UpdateLessonInput) {
    const { courseId, ...rest } = updateLessonInput;

    await this.lessonRepository.update(id, { ...rest });

    return this.findOne(id);
  }

  async remove(id: number) {
    const lesson = await this.findOne(id);

    const deletedLesson = await lesson.remove();

    return { ...deletedLesson, id };
  }
}
