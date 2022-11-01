import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Attendance } from 'src/attendances/entities/attendance.entity';
import { LessonsModule } from 'src/lessons/lessons.module';
import { UsersModule } from 'src/users/users.module';
import { AttendancesResolver } from './attendances.resolver';
import { AttendancesService } from './attendances.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Attendance]),
    UsersModule,
    forwardRef(() => LessonsModule),
  ],
  providers: [AttendancesResolver, AttendancesService],
  exports: [AttendancesService],
})
export class AttendancesModule {}
