import { define } from 'typeorm-seeding';
import * as Faker from 'faker';
import { Exam } from 'src/exams/entities/exam.entity';

define(Exam, (faker: typeof Faker) => {
  const exam = new Exam();
  exam.name = faker.random.word();
  exam.weight = 1;
  return exam;
});
