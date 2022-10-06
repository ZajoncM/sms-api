import { UseGuards } from '@nestjs/common';
import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { group } from 'console';
import { GqlAuthGuard } from 'src/auth/gql-auth.guard';
import { UserRole } from 'src/users/enums/role.enum';
import { RolesGuard } from 'src/users/guards/roles.guard';
import { UsersService } from 'src/users/users.service';
import { Roles } from 'src/utils/roles.decorator';
import { CoursesService } from './courses.service';
import { CreateCourseInput } from './dto/create-course.input';
import { UpdateCourseInput } from './dto/update-course.input';
import { Course } from './entities/course.entity';

@Resolver(() => Course)
@UseGuards(GqlAuthGuard, RolesGuard)
export class CoursesResolver {
  constructor(
    private readonly coursesService: CoursesService,
    private readonly usersService: UsersService,
  ) {}

  @Mutation(() => Course)
  @Roles(UserRole.ADMIN)
  createCourse(
    @Args('createCourseInput') createCourseInput: CreateCourseInput,
  ) {
    return this.coursesService.create(createCourseInput);
  }

  @Query(() => [Course], { name: 'courses' })
  @Roles(UserRole.ADMIN, UserRole.TEACHER)
  async findAll(
    @Args('updateCourseInput', { nullable: true })
    courseDto?: UpdateCourseInput,
  ) {
    return this.coursesService.findAll(courseDto);
  }

  @Query(() => Course, { name: 'course' })
  @Roles(UserRole.ADMIN)
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.coursesService.findOne(id);
  }

  @Mutation(() => Course)
  @Roles(UserRole.ADMIN)
  updateCourse(
    @Args('id', { type: () => Int }) id: number,
    @Args('updateCourseInput') updateCourseInput: CreateCourseInput,
  ) {
    return this.coursesService.update(id, updateCourseInput);
  }

  @Mutation(() => Course)
  @Roles(UserRole.ADMIN)
  removeCourse(@Args('id', { type: () => Int }) id: number) {
    return this.coursesService.remove(id);
  }

  @ResolveField('teacher')
  teacher(@Parent() course: Course) {
    return this.usersService.findTeacherByCourse(course.id);
  }
}
