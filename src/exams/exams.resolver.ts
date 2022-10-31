import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { CoursesService } from 'src/courses/courses.service';
import { UserRole } from 'src/users/enums/role.enum';
import { Roles } from 'src/utils/roles.decorator';
import { CreateExamInput } from './dto/create-exam.input';
import { UpdateExamInput } from './dto/update-exam.input';
import { Exam } from './entities/exam.entity';
import { ExamsService } from './exams.service';

@Resolver(Exam)
export class ExamsResolver {
  constructor(
    private readonly examsService: ExamsService,
    private readonly coursesService: CoursesService,
  ) {}

  @Mutation(() => Exam)
  @Roles(UserRole.TEACHER)
  createExam(@Args('createExamInput') createExamInput: CreateExamInput) {
    return this.examsService.create(createExamInput);
  }

  @Query(() => [Exam], { name: 'exams' })
  @Roles(UserRole.TEACHER)
  async findAll(
    @Args('examDto', { nullable: true })
    examDto: UpdateExamInput,
  ) {
    return this.examsService.findAll(examDto);
  }

  @Query(() => Exam, { name: 'exam' })
  @Roles(UserRole.TEACHER)
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.examsService.findOne(id);
  }

  @Mutation(() => Exam)
  @Roles(UserRole.TEACHER)
  updateExam(@Args('updateExamInput') updateExamInput: UpdateExamInput) {
    return this.examsService.update(updateExamInput.id, updateExamInput);
  }

  @Mutation(() => Exam)
  @Roles(UserRole.TEACHER)
  removeExam(@Args('id', { type: () => Int }) id: number) {
    return this.examsService.remove(id);
  }

  @ResolveField('course')
  course(@Parent() exam: Exam) {
    return this.coursesService.findByExam(exam.id);
  }
}
