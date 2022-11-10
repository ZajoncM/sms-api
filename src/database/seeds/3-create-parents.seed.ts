import { User } from 'src/users/entities/user.entity';
import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { UserRole } from 'src/users/enums/role.enum';
import { Parent } from 'src/users/entities/parent.entity';
import { Student } from 'src/users/entities/student.entity';

export default class CreateTeachers implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    const users = await connection
      .getRepository(User)
      .findBy({ role: UserRole.PARENT });

    const students = await connection.getRepository(Student).find();

    await Promise.all(
      users.map((user) =>
        factory(Parent)().create({
          user,
          children: [students.pop(), students.pop()],
        }),
      ),
    );
  }
}
