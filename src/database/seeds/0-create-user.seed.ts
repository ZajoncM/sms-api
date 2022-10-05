import { User } from 'src/users/entities/user.entity';
import { UserRole } from 'src/users/enums/role.enum';
import { Factory, Seeder } from 'typeorm-seeding';

export default class CreateUser implements Seeder {
  public async run(factory: Factory): Promise<any> {
    await factory(User)().create({
      email: 'admin@sms.pl',
      password: 'admin',
      role: UserRole.ADMIN,
    });

    await factory(User)().createMany(20, {
      password: 'student',
      role: UserRole.STUDENT,
    });

    await factory(User)().createMany(4, {
      password: 'teacher',
      role: UserRole.TEACHER,
    });
  }
}
