import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { CreateAttendanceInput } from './create-attendance.input';

@InputType()
export class UpdateAttendanceInput extends PartialType(CreateAttendanceInput) {
  @Field(() => Int, { nullable: true })
  id?: number;
}
