import { ObjectType, Field, ID, InputType } from '@nestjs/graphql';
import { Course } from 'src/courses/entities/course.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  BaseEntity,
  Column,
  ManyToOne,
} from 'typeorm';

@Entity()
@InputType('examEntity')
@ObjectType()
export class Exam extends BaseEntity {
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
