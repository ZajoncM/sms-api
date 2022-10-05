import { ObjectType, Field, ID, InputType } from '@nestjs/graphql';
import { Group } from 'src/groups/entities/group.entity';
import { Teacher } from 'src/users/entities/teacher.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  BaseEntity,
  ManyToOne,
  Column,
} from 'typeorm';

@Entity()
@InputType('courseEntity')
@ObjectType()
export class Course extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => String)
  @Column({ default: 'Pusty' })
  name: string;

  @Field(() => Teacher, { nullable: true })
  @ManyToOne(() => Teacher, (teacher) => teacher.courses, { nullable: true })
  teacher: Teacher;

  @Field(() => Group)
  @ManyToOne(() => Group, (group) => group.courses)
  group: Group;
}
