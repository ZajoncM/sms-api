import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LessonsService } from 'src/lessons/lessons.service';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { CreateAttendanceInput } from './dto/create-attendance.input';
import { UpdateAttendanceInput } from './dto/update-attendance.input';
import { Attendance } from './entities/attendance.entity';

@Injectable()
export class AttendancesService {
  constructor(
    @InjectRepository(Attendance)
    private readonly attendanceRepository: Repository<Attendance>,
    private readonly lessonsService: LessonsService,
    private readonly usersService: UsersService,
  ) {}

  async create(createAttendanceInput: CreateAttendanceInput) {
    const { lessonId, studentId, ...rest } = createAttendanceInput;

    const lesson = await this.lessonsService.findOne(Number(lessonId));

    const student = await this.usersService.findStudent(Number(studentId));

    const foundAttendance = await this.attendanceRepository.findOneBy({
      lesson: { id: Number(lessonId) },
      student: { id: Number(studentId) },
    });

    if (foundAttendance) {
      foundAttendance.type = rest.type;

      return foundAttendance.save();
    }

    const attendance = await this.attendanceRepository.create({
      ...rest,
      lesson,
      student,
    });

    return attendance.save();
  }

  async findAll(attendanceDto: UpdateAttendanceInput) {
    const { lessonId, ...rest } = attendanceDto;

    return this.attendanceRepository.find({
      where: { ...rest, lesson: { id: Number(lessonId) } },
      order: { id: 'ASC' },
    });
  }

  async findOne(id: number) {
    return this.attendanceRepository.findOne({
      where: { id },
    });
  }

  async update(id: number, updateAttendanceInput: UpdateAttendanceInput) {
    const { lessonId, ...rest } = updateAttendanceInput;

    await this.attendanceRepository.update(id, { ...rest });

    return this.findOne(id);
  }

  async remove(id: number) {
    const attendance = await this.findOne(id);

    const deletedAttendance = await attendance.remove();

    return { ...deletedAttendance, id };
  }
}
