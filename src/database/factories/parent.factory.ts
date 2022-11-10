import { Parent } from 'src/users/entities/parent.entity';
import { define } from 'typeorm-seeding';

define(Parent, () => {
  return new Parent();
});
