import { define } from 'typeorm-seeding';
import * as Faker from 'faker';
import { Course } from 'src/courses/entities/course.entity';

define(Course, (faker: typeof Faker) => {
  const course = new Course();

  course.name = faker.random.word();

  return course;
});
