import { User } from 'src/users/entities/user.entity';
import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { UserRole } from 'src/users/enums/role.enum';
import { Teacher } from 'src/users/entities/teacher.entity';

export default class CreateTeachers implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    const users = await connection
      .getRepository(User)
      .findBy({ role: UserRole.TEACHER });

    await Promise.all(users.map((user) => factory(Teacher)().create({ user })));
  }
}
