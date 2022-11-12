import { UseGuards } from '@nestjs/common';
import { Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { GqlAuthGuard } from 'src/auth/gql-auth.guard';
import { CurrentUser } from 'src/utils/current-user.decorator';
import { Roles } from 'src/utils/roles.decorator';
import { Parent as ParentEntity } from './entities/parent.entity';
import { Student } from './entities/student.entity';
import { User } from './entities/user.entity';
import { UserRole } from './enums/role.enum';
import { RolesGuard } from './guards/roles.guard';
import { UsersService } from './users.service';

@Resolver(() => ParentEntity)
@UseGuards(GqlAuthGuard, RolesGuard)
export class ParentsResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => ParentEntity)
  @Roles(UserRole.PARENT)
  parent(@CurrentUser() user: User) {
    return this.usersService.findOneParent(user.id);
  }

  @ResolveField(() => [Student])
  children(@Parent() parent: ParentEntity) {
    return this.usersService.findStudentsByParent(parent.id);
  }
}
