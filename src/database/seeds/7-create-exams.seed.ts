import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { Course } from 'src/courses/entities/course.entity';
import { Exam } from 'src/exams/entities/exam.entity';

export default class CreateTeachers implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    const courses = await connection.getRepository(Course).find();

    for (const course of courses) {
      await factory(Exam)().createMany(4, {
        course,
      });
    }
  }
}
