import { Injectable, ConflictException } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

// WHY THE BCRYPT COST IS SET HERE: The cost factor of 12 is a security decision
// documented in BK-07. It's set in the service (not the repository) because
// hashing is business logic, not persistence logic.
const BCRYPT_COST = 12;

@Injectable()
export class UsersService {
  constructor(private readonly usersRepo: UsersRepository) {}

  // Hash password, create user, return (without password exposed)
  async create(email: string, displayName: string, password: string): Promise<User> {
    const existing = await this.usersRepo.findByEmail(email);
    if (existing) {
      throw new ConflictException({
        message: 'Email already in use',
        errorCode: 'AUTH_EMAIL_ALREADY_EXISTS',
      });
    }
    const hash = await bcrypt.hash(password, BCRYPT_COST);
    return this.usersRepo.create({ email, displayName, passwordHash: hash });
  }

  // Find by email, verify password hash. Returns user or null on mismatch.
  // Never throws on bad credentials — callers decide the error shape.
  async validateCredentials(email: string, password: string): Promise<User | null> {
    const user = await this.usersRepo.findByEmail(email);
    if (!user) {
      return null;
    }
    const valid = await bcrypt.compare(password, user.passwordHash);
    return valid ? user : null;
  }

  // TODO (Issue #2): Implement
  async findById(id: string): Promise<User | null> {
    return this.usersRepo.findActiveById(id);
  }

  // TODO (Issue #2): Implement
  async updateProfile(id: string, data: { displayName?: string; avatarUrl?: string }): Promise<User> {
    throw new Error('Not implemented — see Issue #2');
  }
}
