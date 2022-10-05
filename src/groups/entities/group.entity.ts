import { ObjectType, Field, ID, Int, InputType } from '@nestjs/graphql';
import { Student } from 'src/users/entities/student.entity';
import { Teacher } from 'src/users/entities/teacher.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  BaseEntity,
  OneToOne,
  Column,
  OneToMany,
  JoinColumn,
} from 'typeorm';

@Entity()
@InputType('groupEntity')
@ObjectType()
export class Group extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => String)
  @Column()
  name: string;

  @Field(() => Int)
  @Column({ default: 1 })
  semester: number;

  @Field(() => [Student])
  @OneToMany(() => Student, (student) => student.group)
  students: Student[];

  @Field(() => Teacher, { nullable: true })
  @OneToOne(() => Teacher, (teacher) => teacher.group, {
    nullable: true,
  })
  @JoinColumn()
  educator: Teacher;
}
