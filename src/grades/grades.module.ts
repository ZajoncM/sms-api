import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExamsModule } from 'src/exams/exams.module';
import { UsersModule } from 'src/users/users.module';
import { Grade } from './entities/grade.entity';
import { GradesResolver } from './grades.resolver';
import { GradesService } from './grades.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Grade]),
    forwardRef(() => ExamsModule),
    UsersModule,
  ],
  providers: [GradesResolver, GradesService],
  exports: [GradesService],
})
export class GradesModule {}
