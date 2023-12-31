import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';

import { AuthUser } from '../common/decorators/auth-user.decorator';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateRoomDto } from './dto/create-room.dto';
import { RoomService } from './room.service';

@Controller('rooms')
@UseGuards(JwtAuthGuard)
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @Get()
  getRooms() {
    return this.roomService.getRooms();
  }

  @Get(':id')
  getRoom(@Param('id', ParseIntPipe) id: number) {
    return this.roomService.getRoom(id);
  }

  @Post()
  createRoom(@AuthUser() userId: number, @Body() createRoomDto: CreateRoomDto) {
    return this.roomService.createRoom(createRoomDto, userId);
  }
}
