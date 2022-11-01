import { Field, InputType, PickType } from '@nestjs/graphql';
import { Attendance } from '../entities/attendance.entity';

@InputType()
export class CreateAttendanceInput extends PickType(
  Attendance,
  ['type'],
  InputType,
) {
  @Field(() => String)
  lessonId: string;

  @Field(() => String)
  studentId: string;
}
