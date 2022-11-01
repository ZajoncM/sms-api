import { UseGuards } from '@nestjs/common';
import {
  Args,
  Int,
  Mutation,
  Resolver,
  Query,
  Parent,
  ResolveField,
} from '@nestjs/graphql';
import { AttendancesService } from 'src/attendances/attendances.service';
import { Attendance } from 'src/attendances/entities/attendance.entity';
import { GqlAuthGuard } from 'src/auth/gql-auth.guard';
import { CoursesService } from 'src/courses/courses.service';

import { UserRole } from 'src/users/enums/role.enum';
import { RolesGuard } from 'src/users/guards/roles.guard';
import { Roles } from 'src/utils/roles.decorator';
import { CreateLessonInput } from './dto/create-lesson.input';
import { UpdateLessonInput } from './dto/update-lesson.input';
import { Lesson } from './entities/lesson.entity';
import { LessonsService } from './lessons.service';

@Resolver(Lesson)
@UseGuards(GqlAuthGuard, RolesGuard)
export class LessonsResolver {
  constructor(
    private readonly lessonsService: LessonsService,
    private readonly coursesService: CoursesService,
    private readonly attendancesService: AttendancesService,
  ) {}

  @Mutation(() => Lesson)
  @Roles(UserRole.TEACHER)
  createLesson(
    @Args('createLessonInput') createLessonInput: CreateLessonInput,
  ) {
    return this.lessonsService.create(createLessonInput);
  }

  @Query(() => [Lesson], { name: 'lessons' })
  @Roles(UserRole.TEACHER)
  async findAll(
    @Args('lessonDto', { nullable: true })
    lessonDto: UpdateLessonInput,
  ) {
    return this.lessonsService.findAll(lessonDto);
  }

  @Query(() => Lesson, { name: 'lesson' })
  @Roles(UserRole.TEACHER)
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.lessonsService.findOne(id);
  }

  @Mutation(() => Lesson)
  @Roles(UserRole.TEACHER)
  updateLesson(
    @Args('updateLessonInput') updateLessonInput: UpdateLessonInput,
  ) {
    return this.lessonsService.update(updateLessonInput.id, updateLessonInput);
  }

  @Mutation(() => Lesson)
  @Roles(UserRole.TEACHER)
  removeLesson(@Args('id', { type: () => Int }) id: number) {
    return this.lessonsService.remove(id);
  }

  @ResolveField('course')
  course(@Parent() lesson: Lesson) {
    return this.coursesService.findByLesson(lesson.id);
  }

  @ResolveField('attendances')
  async attendances(@Parent() lesson: Lesson) {
    return await this.attendancesService.findAll({
      lessonId: lesson.id.toString(),
    });
  }
}
