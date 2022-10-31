import { Field, InputType, PickType } from '@nestjs/graphql';
import { Exam } from '../entities/exam.entity';

@InputType()
export class CreateExamInput extends PickType(Exam, ['name'], InputType) {
  @Field(() => String)
  courseId: string;
}
