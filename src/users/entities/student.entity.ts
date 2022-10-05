import { ObjectType, InputType, Field, ID } from '@nestjs/graphql';
import { Group } from 'src/groups/entities/group.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  BaseEntity,
  JoinColumn,
  OneToOne,
  ManyToOne,
} from 'typeorm';
import { User } from './user.entity';

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
}
