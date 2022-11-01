import { registerEnumType } from '@nestjs/graphql';

export enum AttendanceType {
  PRESENT = 'PRESENT',
  ABSENT = 'ABSENT',
}

registerEnumType(AttendanceType, {
  name: 'AttendanceTypeEnum',
});
