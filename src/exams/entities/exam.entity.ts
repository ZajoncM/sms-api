import { ObjectType, Field, ID, InputType, Int } from '@nestjs/graphql';
import { Course } from 'src/courses/entities/course.entity';
import { Grade } from 'src/grades/entities/grade.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  BaseEntity,
  Column,
  ManyToOne,
  OneToMany,
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

  @Field(() => Int)
  @Column()
  weight: number;

  @Field(() => String)
  @ManyToOne(() => Course, (course) => course.exams)
  course: Course;

  @Field(() => [Grade])
  @OneToMany(() => Grade, (grade) => grade.exam)
  grades: Grade[];
}
