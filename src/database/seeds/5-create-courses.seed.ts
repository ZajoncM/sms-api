import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { Group } from 'src/groups/entities/group.entity';
import { Course } from 'src/courses/entities/course.entity';
import { Teacher } from 'src/users/entities/teacher.entity';
import { sample } from 'lodash';

export default class CreateTeachers implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    const groups = await connection.getRepository(Group).find();

    for (const group of groups) {
      const teachers = await connection.getRepository(Teacher).find();

      for (let i = 0; i < 2; i++) {
        await factory(Course)().create({
          group,
          teacher: sample(teachers),
        });
      }
    }
  }
}
