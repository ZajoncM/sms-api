import { Injectable } from '@nestjs/common';
import { CreateCourseInput } from './dto/create-course.input';
import { Course } from './entities/course.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GroupsService } from 'src/groups/groups.service';

@Injectable()
export class CoursesService {
  constructor(
    @InjectRepository(Course)
    private courseRepository: Repository<Course>,
    private readonly groupsService: GroupsService,
  ) {}

  async create(createCourseInput: CreateCourseInput) {
    const { groupId, ...rest } = createCourseInput;

    const group = await this.groupsService.findOne(Number(groupId));

    const course = await this.courseRepository.create({ ...rest, group });

    return course.save();
  }

  async findAll() {
    return this.courseRepository.find();
  }

  async findByGroup(id: number) {
    return this.courseRepository.findBy({ group: { id } });
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