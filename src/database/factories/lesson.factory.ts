import { define } from 'typeorm-seeding';
import * as Faker from 'faker';

import { Lesson } from 'src/lessons/entities/lesson.entity';

define(Lesson, (faker: typeof Faker) => {
  const lesson = new Lesson();

  lesson.name = faker.random.word();
  lesson.description = faker.random.words(12);

  return lesson;
});
