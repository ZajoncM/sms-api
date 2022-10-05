import { UseGuards } from '@nestjs/common';
import {
  Args,
  Int,
  Mutation,
  Resolver,
  Query,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { GqlAuthGuard } from 'src/auth/gql-auth.guard';
import { CoursesService } from 'src/courses/courses.service';
import { UserRole } from 'src/users/enums/role.enum';
import { RolesGuard } from 'src/users/guards/roles.guard';
import { UsersService } from 'src/users/users.service';
import { Roles } from 'src/utils/roles.decorator';
import { CreateGroupInput } from './dto/create-group.input';
import { UpdateGroupInput } from './dto/update-group.input';
import { Group } from './entities/group.entity';
import { GroupsService } from './groups.service';

@Resolver(() => Group)
@UseGuards(GqlAuthGuard, RolesGuard)
export class GroupsResolver {
  constructor(
    private readonly groupsService: GroupsService,
    private readonly usersService: UsersService,
    private readonly coursesService: CoursesService,
  ) {}

  @Mutation(() => Group)
  @Roles(UserRole.ADMIN)
  createGroup(@Args('createGroupInput') createGroupInput: CreateGroupInput) {
    return this.groupsService.create(createGroupInput);
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

  @ResolveField('students')
  students(@Parent() group: Group) {
    return this.usersService.findStudentsByGroup(group.id);
  }

  @ResolveField('educator')
  educator(@Parent() group: Group) {
    return this.usersService.findTeacherByGroup(group.id);
  }

  @ResolveField('courses')
  courses(@Parent() group: Group) {
    return this.coursesService.findByGroup(group.id);
  }
}
