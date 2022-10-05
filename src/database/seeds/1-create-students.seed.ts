import { Student } from 'src/users/entities/student.entity';
import { User } from 'src/users/entities/user.entity';
import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { UserRole } from 'src/users/enums/role.enum';

export default class CreateStudents implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    const users = await connection
      .getRepository(User)
      .findBy({ role: UserRole.STUDENT });

    await Promise.all(users.map((user) => factory(Student)().create({ user })));
  }
}
