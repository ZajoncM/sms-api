import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/auth/gql-auth.guard';
import { CurrentUser } from 'src/utils/current-user.decorator';
import { Roles } from 'src/utils/roles.decorator';
import { UserRole } from './enums/role.enum';
import { RolesGuard } from './guards/roles.guard';

@Resolver(() => User)
@UseGuards(GqlAuthGuard, RolesGuard)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation(() => User)
  @Roles(UserRole.ADMIN)
  createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.usersService.create(createUserInput);
  }

  @Query(() => [User], { name: 'users' })
  @Roles(UserRole.ADMIN)
  findAll(
    @Args('user', { type: () => UpdateUserInput, nullable: true })
    user: UpdateUserInput,
  ) {
    return this.usersService.findAll(user);
  }

  @Query(() => User, { name: 'user' })
  @Roles(UserRole.ADMIN)
  findOne(
    @Args('user', { type: () => UpdateUserInput }) user: UpdateUserInput,
  ) {
    return this.usersService.findOne(user);
  }

  @Mutation(() => User)
  @Roles(UserRole.ADMIN)
  updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
    return this.usersService.update(updateUserInput.id, updateUserInput);
  }

  @Mutation(() => User)
  @Roles(UserRole.ADMIN)
  removeUser(@Args('id', { type: () => Int }) id: number) {
    return this.usersService.remove(id);
  }

  @Query(() => User)
  currentUser(@CurrentUser() user: User) {
    return this.usersService.findOne({ email: user.email });
  }
}
