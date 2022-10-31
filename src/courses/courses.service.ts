import { Injectable } from '@nestjs/common';
import { CreateCourseInput } from './dto/create-course.input';
import { Course } from './entities/course.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { GroupsService } from 'src/groups/groups.service';
import { UsersService } from 'src/users/users.service';
import { UpdateCourseInput } from './dto/update-course.input';

@Injectable()
export class CoursesService {
  constructor(
    @InjectRepository(Course)
    private courseRepository: Repository<Course>,
    private readonly groupsService: GroupsService,
    private readonly usersService: UsersService,
  ) {}

  async create(createCourseInput: CreateCourseInput) {
    const { groupId, ...rest } = createCourseInput;

    const group = await this.groupsService.findOne(Number(groupId));

    const course = await this.courseRepository.create({ ...rest, group });

    return course.save();
  }

  async update(id: number, updateCourseInput: CreateCourseInput) {
    const { name, teacherId } = updateCourseInput;

    const course = await this.courseRepository.findOneBy({ id });

    if (teacherId) {
      const teacher = await this.usersService.findTeacher(Number(teacherId));
      course.teacher = teacher;
    }

    course.name = name;

    return course.save();
  }

  async findAll(courseDto?: UpdateCourseInput) {
    const { teacherId, ...rest } = courseDto;

    return this.courseRepository.findBy({
      ...rest,
      teacher: { id: Number(teacherId) },
    });
  }

  async findByGroup(id: number) {
    return this.courseRepository.findBy({ group: { id } });
  }

  async findByLesson(id: number) {
    return this.courseRepository.findBy({ lessons: { id: In([id]) } });
  }

  async findOne(id: number) {
    return this.courseRepository.findOneBy({ id });
  }

  async remove(id: number) {
    const course = await this.findOne(id);

    const deletedCourse = await course.remove();

    return { ...deletedCourse, id };
  }
}
