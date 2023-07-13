import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import typeormConfig from './config/typeorm.config';
import { Message } from './message/message.entity';
import { Room } from './room/room.entity';
import { User } from './user/user.entity';
import { AuthController } from './auth/auth.controller';
import { UserController } from './user/user.controller';
import { MessageController } from './message/message.controller';
import { RoomController } from './room/room.controller';
import { RoomService } from './room/room.service';
import { ChatGateway } from './chat/chat.gateway';
import { MessageService } from './message/message.service';
import { UserService } from './user/user.service';
import { AuthService } from './auth/auth.service';
import { JwtStrategy } from './auth/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';
import { S3StorageAdapter } from './files/storage.adapter';

const controllers = [
  AuthController,
  UserController,
  MessageController,
  RoomController,
];

const providers = [
  S3StorageAdapter,
  RoomService,
  ChatGateway,
  MessageService,
  UserService,
  AuthService,
  JwtStrategy,
];

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({ useFactory: typeormConfig }),
    TypeOrmModule.forFeature([Message, Room, User]),
    PassportModule,
    JwtModule.registerAsync({
      useFactory: (): JwtModuleOptions => ({
        secret: process.env.JWT_SECRET,
        signOptions: {
          expiresIn: process.env.JWT_EXPIRES_IN,
        },
      }),
    }),
  ],
  controllers: [...controllers],
  providers: [...providers],
})
export class AppModule {}
