import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateAttendanceInput } from 'src/attendances/dto/create-attendance.input';
import { UpdateAttendanceInput } from 'src/attendances/dto/update-attendance.input';
import { Attendance } from 'src/attendances/entities/attendance.entity';
import { UserRole } from 'src/users/enums/role.enum';
import { Roles } from 'src/utils/roles.decorator';
import { AttendancesService } from './attendances.service';

@Resolver(Attendance)
export class AttendancesResolver {
  constructor(private readonly attendancesService: AttendancesService) {}

  @Mutation(() => Attendance)
  @Roles(UserRole.TEACHER)
  createAttendance(
    @Args('createAttendanceInput') createAttendanceInput: CreateAttendanceInput,
  ) {
    return this.attendancesService.create(createAttendanceInput);
  }

  @Query(() => [Attendance], { name: 'attendances' })
  @Roles(UserRole.TEACHER)
  async findAll(
    @Args('attendanceDto', { nullable: true })
    attendanceDto: UpdateAttendanceInput,
  ) {
    return this.attendancesService.findAll(attendanceDto);
  }

  @Query(() => Attendance, { name: 'attendance' })
  @Roles(UserRole.TEACHER)
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.attendancesService.findOne(id);
  }

  @Mutation(() => Attendance)
  @Roles(UserRole.TEACHER)
  updateAttendance(
    @Args('updateAttendanceInput') updateAttendanceInput: UpdateAttendanceInput,
  ) {
    return this.attendancesService.update(
      updateAttendanceInput.id,
      updateAttendanceInput,
    );
  }

  @Mutation(() => Attendance)
  @Roles(UserRole.TEACHER)
  removeAttendance(@Args('id', { type: () => Int }) id: number) {
    return this.attendancesService.remove(id);
  }
}
