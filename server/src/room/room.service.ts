import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateRoomDto } from './dto/create-room.dto';
import { Room } from './room.entity';

@Injectable()
export class RoomService {
  constructor(
    @InjectRepository(Room)
    private readonly roomRepository: Repository<Room>,
  ) {}

  getRooms() {
    return this.roomRepository.find({});
  }

  getRoom(id: number) {
    return this.roomRepository.findOne({
      where: { id: id },
      relations: ['messages'],
    });
  }

  async createRoom(createRoomDto: CreateRoomDto, userId: number) {
    const room = this.roomRepository.create({
      title: createRoomDto.title,
      owner: { id: userId },
    });
    await this.roomRepository.save(room);
  }
}
