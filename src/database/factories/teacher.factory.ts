import { define } from 'typeorm-seeding';
import { Teacher } from 'src/users/entities/teacher.entity';

define(Teacher, () => {
  return new Teacher();
});
