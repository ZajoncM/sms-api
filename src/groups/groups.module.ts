import { Module } from '@nestjs/common';
import { Group } from './entities/group.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GroupsResolver } from './groups.resolver';
import { GroupsService } from './groups.service';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Group]), UsersModule],
  providers: [GroupsResolver, GroupsService],
})
export class GroupsModule {}
