import { ObjectType, Field, ID, InputType } from '@nestjs/graphql';
import { Group } from 'src/groups/entities/group.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  BaseEntity,
  JoinColumn,
  OneToOne,
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
}
