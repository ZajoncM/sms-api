import { User } from 'src/users/entities/user.entity';
import { define } from 'typeorm-seeding';
import * as Faker from 'faker';
import { UserRole } from 'src/users/enums/role.enum';
import { sample } from 'lodash';

define(User, (faker: typeof Faker) => {
  const firstName = faker.name.firstName();
  const lastName = faker.name.lastName();

  const user = new User();

  user.email = `${firstName}.${lastName}@sms.pl`.toLowerCase();
  user.firstName = firstName;
  user.lastName = lastName;
  user.password = faker.internet.password();
  user.role = sample(Object.values(UserRole));

  return user;
});
