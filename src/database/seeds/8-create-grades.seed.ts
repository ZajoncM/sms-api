import { Factory, Seeder } from 'typeorm-seeding';
import { Connection, In } from 'typeorm';
import { Course } from 'src/courses/entities/course.entity';
import { Exam } from 'src/exams/entities/exam.entity';
import { Group } from 'src/groups/entities/group.entity';
import { Student } from 'src/users/entities/student.entity';
import { Grade } from 'src/grades/entities/grade.entity';

export default class CreateGrades implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    const courses = await connection.getRepository(Course).find();

    for (const course of courses) {
      const { id } = course;

      const group = await connection
        .getRepository(Group)
        .findOneBy({ courses: { id: In([id]) } });

      const students = await connection
        .getRepository(Student)
        .findBy({ group: { id: group.id } });

      const exams = await connection
        .getRepository(Exam)
        .findBy({ course: { id } });

      for (const exam of exams) {
        for (const student of students) {
          await factory(Grade)().create({
            student,
            exam,
          });
        }
      }
    }
  }
}
