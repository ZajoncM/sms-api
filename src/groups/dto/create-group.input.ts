import { Field, InputType, PickType } from '@nestjs/graphql';
import { Group } from '../entities/group.entity';

@InputType()
export class CreateGroupInput extends PickType(
  Group,
  ['name', 'semester'],
  InputType,
) {
  @Field(() => [String])
  studentIds: string[];

  @Field(() => String)
  educatorId: string;
}
