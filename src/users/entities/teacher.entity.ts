import { ObjectType, Field, ID, InputType } from '@nestjs/graphql';
import { Course } from 'src/courses/entities/course.entity';
import { Group } from 'src/groups/entities/group.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  BaseEntity,
  JoinColumn,
  OneToOne,
  OneToMany,
} from 'typeorm';
import { User } from './user.entity';

@Entity()
@InputType('teacherEntity')
@ObjectType()
export class Teacher extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => User)
  @OneToOne(() => User, (user) => user.teacher, { onDelete: 'CASCADE' })
  @JoinColumn()
  user: User;

  @Field(() => Group)
  @OneToOne(() => Group, (group) => group.educator)
  group: Group;

  @Field(() => [Course])
  @OneToMany(() => Course, (course) => course.teacher)
  courses: Course[];
}
