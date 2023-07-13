import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';

import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateMessageDto } from './dto/create-message.dto';
import { GetMessagesDto } from './dto/get-messages.dto';
import { MessageService } from './message.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('messages')
@UseGuards(JwtAuthGuard)
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Get()
  getMessages(@Query() getMessagesDto: GetMessagesDto) {
    return this.messageService.getMessages(getMessagesDto);
  }

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  createMessages(
    @Body() createMessageDto: CreateMessageDto,
    @UploadedFile() fileToSave,
  ) {
    return this.messageService.createMessage(123, createMessageDto);
  }
}
