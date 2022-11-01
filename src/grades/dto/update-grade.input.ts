import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { CreateGradeInput } from './create-grade.input';

@InputType()
export class UpdateGradeInput extends PartialType(CreateGradeInput) {
  @Field(() => Int, { nullable: true })
  id?: number;
}
