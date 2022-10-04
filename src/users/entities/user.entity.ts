import { ObjectType, Field, ID } from '@nestjs/graphql';
import {
  Entity,
  Column,
  OneToOne,
  PrimaryGeneratedColumn,
  BaseEntity,
  JoinColumn,
} from 'typeorm';
import { UserRole } from '../enums/role.enum';
import { Parent } from './parent.entity';
import { Student } from './student.entity';
import { Teacher } from './teacher.entity';

@Entity()
@ObjectType()
export class User extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => String)
  @Column({ unique: true })
  email: string;

  @Field(() => String)
  @Column()
  firstName: string;

  @Field(() => String)
  @Column()
  lastName: string;

  @Field(() => String)
  @Column()
  password: string;

  @Field(() => UserRole)
  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.STUDENT,
  })
  role: UserRole;

  @Field(() => Teacher, { nullable: true })
  @OneToOne(() => Teacher, (teacher) => teacher.user, {
    cascade: true,
    nullable: true,
    eager: true,
  })
  teacher: Teacher;

  @Field(() => Parent, { nullable: true })
  @OneToOne(() => Parent, (parent) => parent.user, {
    cascade: true,
    nullable: true,
    eager: true,
  })
  parent: Parent;

  @Field(() => Student, { nullable: true })
  @OneToOne(() => Student, (student) => student.user, {
    cascade: true,
    nullable: true,
    eager: true,
  })
  student: Student;
}
