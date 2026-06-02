import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = this.usersService.findByEmail(email);
    if (!user) return null;

    const match = await bcrypt.compare(password, user.password);
    if (!match) return null;

    return { id: user.id, email: user.email, name: user.name };
  }

  login(user: { id: string; email: string; name: string }) {
    const payload = { sub: user.id, email: user.email, name: user.name };
    return { access_token: this.jwtService.sign(payload) };
  }
}
