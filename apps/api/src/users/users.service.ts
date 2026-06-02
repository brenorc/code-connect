import { ConflictException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { UserResponseDto } from './dto/user-response.dto';

interface User {
  id: string;
  name: string;
  email: string;
  password: string;
}

@Injectable()
export class UsersService {
  private readonly users: User[] = [];

  async create(dto: CreateUserDto): Promise<UserResponseDto> {
    if (this.users.find((u) => u.email === dto.email)) {
      throw new ConflictException('Email already in use');
    }

    const hashed = await bcrypt.hash(dto.password, 10);
    const user: User = {
      id: crypto.randomUUID(),
      name: dto.name,
      email: dto.email,
      password: hashed,
    };
    this.users.push(user);

    return { id: user.id, name: user.name, email: user.email };
  }

  findByEmail(email: string): User | undefined {
    return this.users.find((u) => u.email === email);
  }
}
