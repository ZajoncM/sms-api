import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CoursesService } from 'src/courses/courses.service';
import { Repository } from 'typeorm';
import { CreateExamInput } from './dto/create-exam.input';
import { UpdateExamInput } from './dto/update-exam.input';
import { Exam } from './entities/exam.entity';

@Injectable()
export class ExamsService {
  constructor(
    @InjectRepository(Exam)
    private readonly examRepository: Repository<Exam>,
    private readonly coursesService: CoursesService,
  ) {}

  async create(createExamInput: CreateExamInput) {
    const { courseId, ...rest } = createExamInput;

    const course = await this.coursesService.findOne(Number(courseId));

    const exam = await this.examRepository.create({
      ...rest,
      course,
    });

    return exam.save();
  }

  async findAll(examDto: UpdateExamInput) {
    const { courseId, ...rest } = examDto;

    return this.examRepository.find({
      where: { ...rest, course: { id: Number(courseId) } },
      order: { id: 'ASC' },
    });
  }

  async findOne(id: number) {
    return this.examRepository.findOne({
      where: { id },
    });
  }

  async update(id: number, updateExamInput: UpdateExamInput) {
    const { courseId, ...rest } = updateExamInput;

    await this.examRepository.update(id, { ...rest });

    return this.findOne(id);
  }

  async remove(id: number) {
    const exam = await this.findOne(id);

    const deletedExam = await exam.remove();

    return { ...deletedExam, id };
  }
}
