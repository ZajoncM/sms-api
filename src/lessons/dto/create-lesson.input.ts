import { Field, InputType, PickType } from '@nestjs/graphql';
import { Lesson } from '../entities/lesson.entity';

@InputType()
export class CreateLessonInput extends PickType(
  Lesson,
  ['name', 'description'],
  InputType,
) {
  @Field(() => String)
  courseId: string;
}
