import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserRole } from 'src/users/enums/role.enum';
import { Roles } from 'src/utils/roles.decorator';
import { CreateGradeInput } from './dto/create-grade.input';
import { UpdateGradeInput } from './dto/update-grade.input';
import { Grade } from './entities/grade.entity';
import { GradesService } from './grades.service';

@Resolver()
export class GradesResolver {
  constructor(private readonly gradesService: GradesService) {}

  @Mutation(() => Grade)
  @Roles(UserRole.TEACHER)
  createGrade(@Args('createGradeInput') createGradeInput: CreateGradeInput) {
    return this.gradesService.create(createGradeInput);
  }

  @Query(() => [Grade], { name: 'grades' })
  @Roles(UserRole.TEACHER, UserRole.STUDENT)
  async findAll(
    @Args('gradeDto', { nullable: true })
    gradeDto: UpdateGradeInput,
  ) {
    return this.gradesService.findAll(gradeDto);
  }

  @Query(() => Grade, { name: 'grade' })
  @Roles(UserRole.TEACHER)
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.gradesService.findOne(id);
  }

  @Mutation(() => Grade)
  @Roles(UserRole.TEACHER)
  updateGrade(@Args('updateGradeInput') updateGradeInput: UpdateGradeInput) {
    return this.gradesService.update(updateGradeInput.id, updateGradeInput);
  }

  @Mutation(() => Grade)
  @Roles(UserRole.TEACHER)
  removeGrade(@Args('id', { type: () => Int }) id: number) {
    return this.gradesService.remove(id);
  }
}
