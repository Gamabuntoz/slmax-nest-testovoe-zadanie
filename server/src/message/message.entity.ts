import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Room } from '../room/room.entity';
import { User } from '../user/user.entity';

@Entity()
export class Message {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  content: string;

  @Column()
  roomName: string;

  @Column()
  userName: string;

  @ManyToOne(() => Room, (room) => room.messages)
  room: Room;

  @ManyToOne(() => User, (user) => user.messages)
  owner: User;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @Column({ nullable: true })
  file: string;
}
