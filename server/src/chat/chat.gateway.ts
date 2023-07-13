import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';

import { AuthService } from '../auth/auth.service';
import { MessageService } from '../message/message.service';
import { CreateMessageDto } from '../message/dto/create-message.dto';
import { S3StorageAdapter } from '../files/storage.adapter';

@WebSocketGateway({ cors: { origin: '*' } })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(
    private readonly authService: AuthService,
    private readonly messageService: MessageService,
    private readonly s3StorageAdapter: S3StorageAdapter,
  ) {}

  handleConnection(client: Socket) {
    const token = client.handshake.auth.token;
    const payload = this.authService.verifyToken(token);
    if (!payload) {
      client.disconnect(true);
    } else {
      console.log(`Client ${client.id} connected. Auth token: ${token}`);
    }
  }

  @SubscribeMessage('message')
  async handleMessage(client: Socket, createMessageDto: CreateMessageDto) {
    console.log(
      `Client ${client.id} sended message: ${createMessageDto.content} to room: ${createMessageDto.roomId}`,
    );
    const token = client.handshake.auth.token;
    const payload = this.authService.verifyToken(token);
    if (createMessageDto.file) {
      const fileLink = await this.s3StorageAdapter.sendFile(
        payload.userId,
        createMessageDto.file,
        createMessageDto.fileType,
      );
      const message = await this.messageService.createMessage(
        payload.userId,
        createMessageDto,
        fileLink.url,
      );
      client.emit('message', message);
      client.to(createMessageDto.roomId.toString()).emit('message', message);
      return;
    }
    const message = await this.messageService.createMessage(
      payload.userId,
      createMessageDto,
    );
    client.emit('message', message);
    client.to(createMessageDto.roomId.toString()).emit('message', message);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client ${client.id} disconnected`);
  }
}
