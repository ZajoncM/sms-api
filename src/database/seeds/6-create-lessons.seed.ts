import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { Course } from 'src/courses/entities/course.entity';
import { Lesson } from 'src/lessons/entities/lesson.entity';

export default class CreateLessons implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    const courses = await connection.getRepository(Course).find();

    for (const course of courses) {
      await factory(Lesson)().createMany(4, {
        course,
      });
    }
  }
}
