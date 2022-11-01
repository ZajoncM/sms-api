import { ObjectType, Field, ID, InputType } from '@nestjs/graphql';
import { Course } from 'src/courses/entities/course.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  BaseEntity,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Attendance } from '../../attendances/entities/attendance.entity';

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

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  description: string;

  @Field(() => Course)
  @ManyToOne(() => Course, (course) => course.lessons)
  course: Course;

  @Field(() => [Attendance])
  @OneToMany(() => Attendance, (attendance) => attendance.lesson)
  attendances: Attendance[];
}
