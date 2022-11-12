import { define } from 'typeorm-seeding';
import * as Faker from 'faker';
import { Grade } from 'src/grades/entities/grade.entity';

define(Grade, (faker: typeof Faker) => {
  const grade = new Grade();

  grade.value = faker.random.number({ min: 1, max: 6 });

  return grade;
});
