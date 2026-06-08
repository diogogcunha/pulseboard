import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

// WHY A CUSTOM REPOSITORY: To enforce the soft-delete pattern.
// Raw TypeORM find() can return soft-deleted users if called incorrectly.
// This repository wraps all queries to ensure deleted users are excluded.
// Participants implement the methods in Issue #1 and #2.
@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(User)
    private readonly repo: Repository<User>,
  ) {}

  // Find user by email, excluding soft-deleted
  async findByEmail(email: string): Promise<User | null> {
    return this.repo.findOne({ where: { email }, withDeleted: false });
  }

  // WHY NOT repo.findOne(): raw findOne() may return soft-deleted users.
  // This method explicitly excludes soft-deleted rows via withDeleted: false.
  async findActiveById(id: string): Promise<User | null> {
    return this.repo.findOne({ where: { id }, withDeleted: false });
  }

  // Save a new user (password already hashed by caller)
  async create(data: Partial<User>): Promise<User> {
    const user = this.repo.create(data);
    return this.repo.save(user);
  }

  // TODO (Issue #2): Implement
  async update(id: string, data: Partial<User>): Promise<User> {
    throw new Error('Not implemented — see Issue #2');
  }

  // TODO (Issue #20): Implement soft delete — sets deleted_at timestamp
  async softDelete(id: string): Promise<void> {
    throw new Error('Not implemented — see Issue #20');
  }
}
