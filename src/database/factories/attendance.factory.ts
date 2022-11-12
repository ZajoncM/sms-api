import { define } from 'typeorm-seeding';
import * as Faker from 'faker';
import { sample } from 'lodash';
import { Attendance } from 'src/attendances/entities/attendance.entity';
import { AttendanceType } from 'src/lessons/enums/attendance-type.enum';

define(Attendance, (faker: typeof Faker) => {
  const attendance = new Attendance();

  attendance.type = sample(Object.values(AttendanceType));

  return attendance;
});
