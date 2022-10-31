import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { CreateExamInput } from './create-exam.input';

@InputType()
export class UpdateExamInput extends PartialType(CreateExamInput) {
  @Field(() => Int, { nullable: true })
  id?: number;
}
