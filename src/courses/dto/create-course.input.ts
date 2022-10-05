import { Field, InputType, PickType } from '@nestjs/graphql';
import { Course } from '../entities/course.entity';

@InputType()
export class CreateCourseInput extends PickType(Course, ['name'], InputType) {
  @Field(() => String, { nullable: true })
  teacherId: string;

  @Field(() => String)
  groupId: string;
}
