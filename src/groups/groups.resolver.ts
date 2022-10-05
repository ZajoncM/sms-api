import { UseGuards } from '@nestjs/common';
import { Args, Int, Mutation, Resolver, Query } from '@nestjs/graphql';
import { GqlAuthGuard } from 'src/auth/gql-auth.guard';
import { UserRole } from 'src/users/enums/role.enum';
import { RolesGuard } from 'src/users/guards/roles.guard';
import { Roles } from 'src/utils/roles.decorator';
import { CreateGroupInput } from './dto/create-group.input';
import { UpdateGroupInput } from './dto/update-group.input';
import { Group } from './entities/group.entity';
import { GroupsService } from './groups.service';

@Resolver(() => Group)
@UseGuards(GqlAuthGuard, RolesGuard)
export class GroupsResolver {
  constructor(private readonly groupsService: GroupsService) {}

  @Mutation(() => Group)
  @Roles(UserRole.ADMIN)
  createGroup(@Args('createGroupInput') createUserInput: CreateGroupInput) {
    return this.groupsService.create(createUserInput);
  }

  @Query(() => [Group], { name: 'groups' })
  @Roles(UserRole.ADMIN)
  async findAll() {
    return this.groupsService.findAll();
  }

  @Query(() => Group, { name: 'group' })
  @Roles(UserRole.ADMIN)
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.groupsService.findOne(id);
  }

  @Mutation(() => Group)
  @Roles(UserRole.ADMIN)
  updateGroup(@Args('updateGroupInput') updateGroupInput: UpdateGroupInput) {
    return this.groupsService.update(updateGroupInput.id, updateGroupInput);
  }

  @Mutation(() => Group)
  @Roles(UserRole.ADMIN)
  removeGroup(@Args('id', { type: () => Int }) id: number) {
    return this.groupsService.remove(id);
  }
}
