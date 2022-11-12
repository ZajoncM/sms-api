import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserRole } from './enums/role.enum';
import { Student } from './entities/student.entity';
import { Parent } from './entities/parent.entity';
import { Teacher } from './entities/teacher.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Student)
    private studentRepository: Repository<Student>,
    @InjectRepository(Teacher)
    private teacherRepository: Repository<Teacher>,
    @InjectRepository(Parent)
    private parentReopsitory: Repository<Parent>,
  ) {}

  async create(createUserInput: CreateUserInput) {
    const user = await this.usersRepository.create(createUserInput);

    await this.createRole(user);

    return user.save();
  }

  async findAll(userDto?: UpdateUserInput) {
    return this.usersRepository.findBy({ ...userDto });
  }

  async findOne(userDto: UpdateUserInput) {
    return this.usersRepository.findOneBy({ ...userDto });
  }

  async findOneParent(id: number) {
    return this.parentReopsitory.findOneBy({ user: { id } });
  }

  async update(id: number, updateUserInput: UpdateUserInput) {
    await this.usersRepository.update(id, { ...updateUserInput });

    return this.findOne({ id });
  }

  async remove(id: number) {
    const user = await this.findOne({ id });

    const deletedUser = await user.remove();

    return { ...deletedUser, id };
  }

  async createRole(user: User) {
    if (user.role === UserRole.STUDENT) {
      user.student = new Student();
    }

    if (user.role === UserRole.PARENT) {
      user.parent = new Parent();
    }

    if (user.role === UserRole.TEACHER) {
      user.teacher = new Teacher();
    }

    return user.save();
  }

  async findTeacher(id: number) {
    return this.teacherRepository.findOneBy({ id });
  }

  async findStudent(id: number) {
    return this.studentRepository.findOneBy({ id });
  }

  async findParent(id: number) {
    return this.parentReopsitory.findOneBy({ user: { id } });
  }

  async findStudentsByGroup(id: number) {
    return this.studentRepository.find({
      where: { group: { id } },
      relations: { user: true },
    });
  }

  async findStudentsByParent(id: number) {
    return this.studentRepository.find({
      where: { parent: { id } },
      relations: {
        user: true,
        attendances: { lesson: true },
        grades: { exam: true },
      },
    });
  }

  async findTeacherByGroup(id: number) {
    return this.teacherRepository.findOne({
      where: { group: { id } },
      relations: { user: true },
    });
  }

  async findTeacherByCourse(id: number) {
    return this.teacherRepository.findOne({
      where: { courses: { id } },
      relations: { user: true },
    });
  }
}
