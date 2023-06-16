import { Injectable } from '@nestjs/common'
import { genSalt, hash, compare } from 'bcrypt';
import { SALT_ROUNDS } from './user.constant';
import { User, UserRole, UserRoleType } from '@guitar-shop/shared-types'
import { Entity } from '@guitar-shop/core';

@Injectable()
export class UserEntity implements Entity<UserEntity, User>, User {
  public id?: number;
  public email: string;
  public name: string;
  public password: string;
  public origin: string;
  public role: UserRoleType;
  public createdAt: Date;
  public updatedAt: Date;

  constructor(user: Partial<User>) {
    this.fillEntity(user);
  }

  public async setPassword(password: string): Promise<UserEntity> {
    const salt = await genSalt(SALT_ROUNDS);
    this.password = await hash(password, salt);
    return this;
  }

  public async comparePassword(password: string): Promise<boolean> {
    return compare(password, this.password);
  }

  public toObject() {
    return { ...this };
  }

  public fillEntity(user: Partial<User>) {
    this.id = user.id;
    this.email = user.email;
    this.name = user.name;
    this.role = UserRole.User;
    this.password = user.password;
    this.origin = user.password;
    this.createdAt = user.createdAt || new Date();
    this.updatedAt = user.updatedAt || new Date();
  }
}
