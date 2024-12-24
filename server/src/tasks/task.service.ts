import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
  ) {}

  async findAll(
    page : number,
    limit :number
  ): Promise<{ tasks: Task[]; success: boolean; message: string | null; total: number }> {
    try {
      const paginationLimit = Math.min(limit, 100); // Restrict maximum limit to 100
      const [tasks, total] = await this.taskRepository.findAndCount({
        skip: (page - 1) * paginationLimit,
        take: paginationLimit,
      });
      return { tasks, success: true, message: null, total };
    } catch (err) {
      return { tasks: [], success: false, message: err.message, total: 0 };
    }
  }


  findOne(id: number): Promise<Task> {
    return this.taskRepository.findOne({ where: { id } });
  }

  async create(input: Partial<Task>): Promise<{task: Task, success: boolean, message: string|null}> {
    try {
      const task = await this.taskRepository.save(input);
      return { task, success: true, message: 'task created successffully !' }
    } catch (err) {
      return { task: null, success: false, message: err.message }
    }
  }

  async update(id: number, task: Partial<Task>): Promise<Task> {
    await this.taskRepository.update(id, task);
    return this.findOne(id);
  }

  async delete(id: number): Promise<void> {
    await this.taskRepository.delete(id);
  }
}