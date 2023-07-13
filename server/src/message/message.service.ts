import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';

import { CreateMessageDto } from './dto/create-message.dto';
import { GetMessagesDto } from './dto/get-messages.dto';
import { Message } from './message.entity';
import { RoomService } from '../room/room.service';
import { UserService } from '../user/user.service';

@Injectable()
export class MessageService {
  constructor(
    private readonly userService: UserService,
    private readonly roomService: RoomService,
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,
  ) {}

  async getMessages(getMessagesDto: GetMessagesDto) {
    const room = await this.roomService.getRoom(getMessagesDto.roomId);
    if (getMessagesDto.search) {
      return this.messageRepository.find({
        where: {
          roomName: room.title,
          content: ILike(`%${getMessagesDto.search}%`),
        },
      });
    }
    return this.messageRepository.find({
      where: { roomName: room.title },
    });
  }

  async createMessage(
    userId: number,
    createMessageDto: CreateMessageDto,
    fileLink?: string,
  ) {
    const room = await this.roomService.getRoom(createMessageDto.roomId);
    const user = await this.userService.getUser(userId);
    const newMessage = {
      content: createMessageDto.content,
      roomName: room.title,
      userName: user.login,
      roomId: createMessageDto.roomId,
      ownerId: userId,
      file: null,
    };
    if (fileLink) newMessage.file = fileLink;
    const message = this.messageRepository.create(newMessage);
    await this.messageRepository.save(message);
    return message;
  }
}
