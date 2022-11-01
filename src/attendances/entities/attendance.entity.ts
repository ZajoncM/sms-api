import { ObjectType, Field, ID, InputType } from '@nestjs/graphql';
import { Student } from 'src/users/entities/student.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  BaseEntity,
  ManyToOne,
  Column,
} from 'typeorm';
import { AttendanceType } from '../../lessons/enums/attendance-type.enum';
import { Lesson } from '../../lessons/entities/lesson.entity';

@Entity()
@InputType('attendanceEntity')
@ObjectType()
export class Attendance extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => Lesson)
  @ManyToOne(() => Lesson, (lesson) => lesson.attendances)
  lesson: Lesson;

  @Field(() => Student)
  @ManyToOne(() => Student, (student) => student.attendances, { eager: true })
  student: Student;

  @Field(() => AttendanceType, { defaultValue: AttendanceType.ABSENT })
  @Column({
    type: 'enum',
    enum: AttendanceType,
    default: AttendanceType.ABSENT,
  })
  type: AttendanceType;
}
