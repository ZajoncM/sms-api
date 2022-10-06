import { ObjectType, Field, ID, Int, InputType } from '@nestjs/graphql';
import { Course } from 'src/courses/entities/course.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  BaseEntity,
  Column,
  ManyToOne,
} from 'typeorm';

@Entity()
@InputType('lessonEntity')
@ObjectType()
export class Lesson extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => String)
  @Column()
  name: string;

  @Field(() => String)
  @ManyToOne(() => Course, (course) => course.lessons)
  course: Course;
}
