import { Component, Inject } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { UserRepository } from './user.repository';

@Component()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
  ) {}

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async create(userBody: CreateUserDto): Promise<User> {
    const user: User = this.userRepository.create(userBody);
    await user.hashPassword();
    await this.userRepository.save(user);
    return user.clean();
  }

  async get(id: string): Promise<User> {
    return await this.userRepository.findOneById(id);
  }

  async getFullUserByEmail(email: string): Promise<User> {
    return await this.userRepository.findFullByEmail(email);
  }

  async findById(id: string): Promise<User> {
    return await this.userRepository.findOne({"id": id});
  }

  async findByEmail(email: string): Promise<User> {
    return await this.userRepository.findOne({"email": email});
  }

  async update(data: UpdateUserDto): Promise<void> {
    return await this.userRepository.update({"id": data.id}, data);
  }
}
