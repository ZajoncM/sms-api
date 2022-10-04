import { ObjectType, Field, ID } from '@nestjs/graphql';
import {
  Entity,
  PrimaryGeneratedColumn,
  BaseEntity,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import { User } from './user.entity';

@Entity()
@ObjectType()
export class Teacher extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => User, (user) => user.teacher, { onDelete: 'CASCADE' })
  @JoinColumn()
  user: User;
}
