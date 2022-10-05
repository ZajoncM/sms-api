import { UseGuards } from '@nestjs/common';
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GqlAuthGuard } from 'src/auth/gql-auth.guard';
import { UserRole } from 'src/users/enums/role.enum';
import { RolesGuard } from 'src/users/guards/roles.guard';
import { Roles } from 'src/utils/roles.decorator';
import { CoursesService } from './courses.service';
import { CreateCourseInput } from './dto/create-course.input';
import { Course } from './entities/course.entity';

@Resolver(() => Course)
@UseGuards(GqlAuthGuard, RolesGuard)
export class CoursesResolver {
  constructor(private readonly coursesService: CoursesService) {}

  @Mutation(() => Course)
  @Roles(UserRole.ADMIN)
  createCourse(
    @Args('createCourseInput') createCourseInput: CreateCourseInput,
  ) {
    return this.coursesService.create(createCourseInput);
  }

  @Query(() => [Course], { name: 'courses' })
  @Roles(UserRole.ADMIN)
  async findAll() {
    return this.coursesService.findAll();
  }

  @Query(() => Course, { name: 'course' })
  @Roles(UserRole.ADMIN)
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.coursesService.findOne(id);
  }

  @Mutation(() => Course)
  @Roles(UserRole.ADMIN)
  removeCourse(@Args('id', { type: () => Int }) id: number) {
    return this.coursesService.remove(id);
  }
}