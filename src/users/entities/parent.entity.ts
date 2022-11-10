import { ObjectType, Field, ID, InputType } from '@nestjs/graphql';
import {
  Entity,
  PrimaryGeneratedColumn,
  BaseEntity,
  JoinColumn,
  OneToOne,
  OneToMany,
} from 'typeorm';
import { Student } from './student.entity';
import { User } from './user.entity';

@Entity()
@InputType('parentEntity')
@ObjectType()
export class Parent extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => User, (user) => user.parent, { onDelete: 'CASCADE' })
  @JoinColumn()
  user: User;

  @Field(() => [Student])
  @OneToMany(() => Student, (student) => student.parent, { eager: true })
  children: Student[];
}
