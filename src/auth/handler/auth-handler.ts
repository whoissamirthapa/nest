/* eslint-disable prettier/prettier */
import {
  CommandHandler,
  ICommandHandler,
  IQueryHandler,
  QueryHandler,
} from '@nestjs/cqrs';
import {
  AddAuthCommand,
  LoginAuthCommand,
  ToggleFollowCommand,
} from '../commands/add-command';
import { AuthService } from '../auth.service';
import { GetProfileQuery, GetUsersQuery } from '../queries/getusers-query';
import { UpdateUserCommand } from '../commands/update-profile.command';

@CommandHandler(AddAuthCommand)
export class AddAuthHandler implements ICommandHandler<AddAuthCommand> {
  constructor(private readonly authService: AuthService) {}
  async execute(command: AddAuthCommand): Promise<any> {
    return this.authService.addAuth(command?.data);
  }
}

@CommandHandler(LoginAuthCommand)
export class LoginAuthHandler implements ICommandHandler<LoginAuthCommand> {
  constructor(private readonly authService: AuthService) {}
  async execute(command: LoginAuthCommand): Promise<any> {
    return this.authService.loginAuth(command?.data);
  }
}

@QueryHandler(GetUsersQuery)
export class GetAuthHandler implements IQueryHandler<GetUsersQuery> {
  constructor(private readonly authService: AuthService) {}
  async execute(command: GetUsersQuery): Promise<any> {
    return this.authService.getUsers();
  }
}

@QueryHandler(GetProfileQuery)
export class GetProfileHandler implements IQueryHandler<GetProfileQuery> {
  constructor(private readonly authService: AuthService) {}
  async execute(command: GetProfileQuery): Promise<any> {
    return this.authService.getProfile(command?.id);
  }
}

@CommandHandler(UpdateUserCommand)
export class UpdateAuthHandler implements ICommandHandler<UpdateUserCommand> {
  constructor(private readonly authService: AuthService) {}
  async execute(command: UpdateUserCommand): Promise<any> {
    return this.authService.updateProfile(
      command?.id,
      command?.path,
      command?.data,
    );
  }
}

@CommandHandler(ToggleFollowCommand)
export class ToggleFollowHandler
  implements ICommandHandler<ToggleFollowCommand>
{
  constructor(private readonly authService: AuthService) {}
  async execute(command: ToggleFollowCommand): Promise<any> {
    return this.authService.toggleFollow(command?.id, command?.user_id);
  }
}
