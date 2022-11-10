import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { Student } from 'src/users/entities/student.entity';
import { Group } from 'src/groups/entities/group.entity';

export default class CreateTeachers implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    for (let i = 0; i < 4; i++) {
      const students = await connection
        .getRepository(Student)
        .find({ where: { group: null }, take: 4 });

      await factory(Group)().create({
        students,
      });
    }
  }
}
