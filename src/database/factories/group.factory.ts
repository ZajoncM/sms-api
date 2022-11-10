import { Group } from 'src/groups/entities/group.entity';
import { define } from 'typeorm-seeding';
import * as Faker from 'faker';

define(Group, (faker: typeof Faker) => {
  const group = new Group();

  group.name = faker.random.word();

  return group;
});
