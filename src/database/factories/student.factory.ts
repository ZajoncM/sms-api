import { Student } from 'src/users/entities/student.entity';
import { define } from 'typeorm-seeding';

define(Student, () => {
  return new Student();
});
