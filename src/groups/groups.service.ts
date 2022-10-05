import { Injectable } from '@nestjs/common';
import { CreateGroupInput } from './dto/create-group.input';
import { UpdateGroupInput } from './dto/update-group.input';
import { Group } from './entities/group.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';
import { Student } from 'src/users/entities/student.entity';

@Injectable()
export class GroupsService {
  constructor(
    @InjectRepository(Group)
    private readonly groupRepository: Repository<Group>,
    private readonly usersService: UsersService,
  ) {}

  async create(createGroupInput: CreateGroupInput) {
    const { studentIds, educatorId, ...rest } = createGroupInput;

    const students: Student[] = [];

    for (const studentId of studentIds) {
      const student = await this.usersService.findStudent(Number(studentId));

      students.push(student);
    }

    const educator = await this.usersService.findTeacher(Number(educatorId));

    const group = await this.groupRepository.create({
      ...rest,
      students,
      educator,
    });

    return group.save();
  }

  async findAll() {
    return this.groupRepository.find({
      relations: { students: { user: true }, educator: { user: true } },
    });
  }

  async findOne(id: number) {
    return this.groupRepository.findOne({
      where: { id },
      relations: { students: { user: true }, educator: { user: true } },
    });
  }

  async update(id: number, updateGroupInput: UpdateGroupInput) {
    const { studentIds, educatorId, ...rest } = updateGroupInput;

    await this.groupRepository.update(id, { ...rest });

    const group = await this.findOne(id);

    const educator = await this.usersService.findTeacher(Number(educatorId));

    const students: Student[] = [];
    for (const studentId of studentIds) {
      const student = await this.usersService.findStudent(Number(studentId));

      students.push(student);
    }

    group.educator = educator;

    group.students = students;

    return group.save();
  }

  async remove(id: number) {
    const group = await this.findOne(id);

    const deletedGroup = await group.remove();

    return { ...deletedGroup, id };
  }
}
