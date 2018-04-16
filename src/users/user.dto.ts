export class CreateUserDto {
  readonly firstName: string;
  readonly lastName: string;
  readonly handle: string;
  readonly password: string;
}

export class UpdateUserDto extends CreateUserDto {
  readonly id: string;
}
