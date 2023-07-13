import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { SignupCredentialsDto } from '../auth/dto/signup-credentials.dto';
import { User } from './user.entity';
import { Hash } from '../common/utils/hash.util';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  getUsers() {
    return this.userRepository.find();
  }

  getUser(id: number) {
    return this.userRepository.findOneBy({ id });
  }

  getUserByLogin(login: string) {
    return this.userRepository.findOneBy({ login });
  }

  async createUser(signupCredentialsDto: SignupCredentialsDto) {
    const foundUser = await this.getUserByLogin(signupCredentialsDto.login);
    if (foundUser) {
      throw new ConflictException('Email already in use');
    }
    const passwordHash = Hash.generateHash(signupCredentialsDto.password);
    const user = this.userRepository.create({
      login: signupCredentialsDto.login,
      password: passwordHash,
    });
    await this.userRepository.save(user);
    return user;
  }
}
