import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ExamsService } from 'src/exams/exams.service';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { CreateGradeInput } from './dto/create-grade.input';
import { UpdateGradeInput } from './dto/update-grade.input';
import { Grade } from './entities/grade.entity';

@Injectable()
export class GradesService {
  constructor(
    @InjectRepository(Grade)
    private readonly gradeRepository: Repository<Grade>,
    private readonly examsService: ExamsService,
    private readonly usersService: UsersService,
  ) {}

  async create(createGradeInput: CreateGradeInput) {
    const { examId, studentId, ...rest } = createGradeInput;

    const exam = await this.examsService.findOne(Number(examId));

    const student = await this.usersService.findStudent(Number(studentId));

    const foundGrade = await this.gradeRepository.findOneBy({
      exam: { id: Number(examId) },
      student: { id: Number(studentId) },
    });

    if (foundGrade) {
      foundGrade.value = rest.value;

      return foundGrade.save();
    }

    const grade = await this.gradeRepository.create({
      ...rest,
      exam,
      student,
    });

    return grade.save();
  }

  async findAll(gradeDto: UpdateGradeInput) {
    const { examId, ...rest } = gradeDto;

    return this.gradeRepository.find({
      where: {
        ...rest,
        exam: { id: Number(examId) },
      },
      order: { id: 'ASC' },
    });
  }

  async findAllByStudentId(studentId: string) {
    return this.gradeRepository.find({
      where: {
        student: { id: Number(studentId) },
      },
      order: { id: 'ASC' },
    });
  }

  async findOne(id: number) {
    return this.gradeRepository.findOne({
      where: { id },
    });
  }

  async update(id: number, updateGradeInput: UpdateGradeInput) {
    const { examId, ...rest } = updateGradeInput;

    await this.gradeRepository.update(id, { ...rest });

    return this.findOne(id);
  }

  async remove(id: number) {
    const grade = await this.findOne(id);

    const deletedGrade = await grade.remove();

    return { ...deletedGrade, id };
  }
}
