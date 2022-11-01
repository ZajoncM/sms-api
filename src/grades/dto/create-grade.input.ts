import { Field, InputType, PickType } from '@nestjs/graphql';
import { Grade } from '../entities/grade.entity';

@InputType()
export class CreateGradeInput extends PickType(Grade, ['value'], InputType) {
  @Field(() => String)
  examId: string;

  @Field(() => String)
  studentId: string;
}
