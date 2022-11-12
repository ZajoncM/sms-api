import { Factory, Seeder } from 'typeorm-seeding';
import { Connection, In } from 'typeorm';
import { Course } from 'src/courses/entities/course.entity';
import { Group } from 'src/groups/entities/group.entity';
import { Student } from 'src/users/entities/student.entity';
import { Attendance } from 'src/attendances/entities/attendance.entity';
import { Lesson } from 'src/lessons/entities/lesson.entity';

export default class CreateAttendances implements Seeder {
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

      const lessons = await connection
        .getRepository(Lesson)
        .findBy({ course: { id } });

      for (const lesson of lessons) {
        for (const student of students) {
          await factory(Attendance)().create({
            student,
            lesson,
          });
        }
      }
    }
  }
}
