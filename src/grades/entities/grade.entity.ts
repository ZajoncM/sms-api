import { ObjectType, Field, ID, InputType, Int } from '@nestjs/graphql';
import { Student } from 'src/users/entities/student.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  BaseEntity,
  ManyToOne,
  Column,
} from 'typeorm';
import { Exam } from '../../exams/entities/exam.entity';
import { Min, Max } from 'class-validator';

@Entity()
@InputType('gradeEntity')
@ObjectType()
export class Grade extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => Int)
  @Column()
  @Min(0)
  @Max(6)
  value: number;

  @Field(() => Exam)
  @ManyToOne(() => Exam, (exam) => exam.grades)
  exam: Exam;

  @Field(() => Student)
  @ManyToOne(() => Student, (student) => student.grades, { eager: true })
  student: Student;
}
