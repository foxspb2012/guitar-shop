import { UserExistsException, UserNotFoundEmailException, UserPasswordWrongException } from '@guitar-shop/core';
import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { MailService } from '../mail/mail.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { UserEntity } from './user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
    private readonly mail: MailService,
    private readonly logger: Logger,
  ) { }

  public async register(dto: CreateUserDto) {
    const { email, password } = dto;
    const existUser = await this.userRepository.findByEmail(email);

    if (existUser) {
      throw new UserExistsException(this.logger, email);
    }

    const userEntity = await new UserEntity(dto).setPassword(password);
    const createdUser = await this.userRepository.create(userEntity);

    await this.mail.sendNotifyNewUser(userEntity);
    return createdUser;
  }

  public async verifyUser(dto: LoginUserDto) {
    const { email, password } = dto;
    const existUser = await this.userRepository.findByEmail(email);

    if (!existUser) {
      throw new UserNotFoundEmailException(this.logger, dto.email);
    }

    const userEntity = new UserEntity(existUser);
    userEntity.role = existUser.role;
    if (! await userEntity.comparePassword(password)) {
      throw new UserPasswordWrongException(this.logger);
    }

    return userEntity.toObject();
  }

  public async loginUser(user: UserEntity) {
    const payload = {
      sub: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    };

    return {
      email: user.email,
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
