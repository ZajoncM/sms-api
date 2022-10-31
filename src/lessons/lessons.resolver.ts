import { UseGuards } from '@nestjs/common';
import { Args, Int, Mutation, Resolver, Query } from '@nestjs/graphql';
import { GqlAuthGuard } from 'src/auth/gql-auth.guard';

import { UserRole } from 'src/users/enums/role.enum';
import { RolesGuard } from 'src/users/guards/roles.guard';
import { Roles } from 'src/utils/roles.decorator';
import { CreateLessonInput } from './dto/create-lesson.input';
import { UpdateLessonInput } from './dto/update-lesson.input';
import { Lesson } from './entities/lesson.entity';
import { LessonsService } from './lessons.service';

@Resolver()
@UseGuards(GqlAuthGuard, RolesGuard)
export class LessonsResolver {
  constructor(private readonly lessonsService: LessonsService) {}

  @Mutation(() => Lesson)
  @Roles(UserRole.ADMIN)
  createLesson(
    @Args('createLessonInput') createLessonInput: CreateLessonInput,
  ) {
    return this.lessonsService.create(createLessonInput);
  }

  @Query(() => [Lesson], { name: 'lessons' })
  @Roles(UserRole.ADMIN)
  async findAll() {
    return this.lessonsService.findAll();
  }

  @Query(() => Lesson, { name: 'lesson' })
  @Roles(UserRole.ADMIN)
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.lessonsService.findOne(id);
  }

  @Mutation(() => Lesson)
  @Roles(UserRole.ADMIN)
  updateLesson(
    @Args('updateLessonInput') updateLessonInput: UpdateLessonInput,
  ) {
    return this.lessonsService.update(updateLessonInput.id, updateLessonInput);
  }

  @Mutation(() => Lesson)
  @Roles(UserRole.ADMIN)
  removeLesson(@Args('id', { type: () => Int }) id: number) {
    return this.lessonsService.remove(id);
  }
}
