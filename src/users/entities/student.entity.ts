import { ObjectType, InputType, Field, ID } from '@nestjs/graphql';
import { Group } from 'src/groups/entities/group.entity';
import { Attendance } from 'src/attendances/entities/attendance.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  BaseEntity,
  JoinColumn,
  OneToOne,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { User } from './user.entity';
import { Grade } from 'src/grades/entities/grade.entity';
import { Parent } from './parent.entity';

@Entity()
@InputType('studentEntity')
@ObjectType()
export class Student extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => User)
  @OneToOne(() => User, (user) => user.student, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  user: User;

  @Field(() => Group)
  @ManyToOne(() => Group, (group) => group.students, { onDelete: 'SET NULL' })
  group: Group;

  @Field(() => [Attendance], { nullable: true })
  @OneToMany(() => Attendance, (attendance) => attendance.student)
  attendances: Attendance[];

  @Field(() => [Grade], { nullable: true })
  @OneToMany(() => Grade, (grade) => grade.student)
  grades: Grade[];

  @ManyToOne(() => Parent, (parent) => parent.children)
  parent: Parent;
}
