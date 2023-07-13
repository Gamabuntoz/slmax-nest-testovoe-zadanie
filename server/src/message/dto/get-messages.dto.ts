import { Type } from 'class-transformer';
import { IsInt, IsString } from 'class-validator';
import { Optional } from '@nestjs/common';

export class GetMessagesDto {
  @IsInt()
  @Type(() => Number)
  readonly roomId: number;
  @IsString()
  @Optional()
  readonly search?: string;
}
