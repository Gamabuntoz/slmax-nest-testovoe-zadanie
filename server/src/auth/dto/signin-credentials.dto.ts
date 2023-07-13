import { IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class SigninCredentialsDto {
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(100)
  readonly login: string;

  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(100)
  readonly password: string;
}
