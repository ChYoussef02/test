// tasks/task.controller.ts
import { Controller, Get, Post, Delete, Param, Body, Patch } from '@nestjs/common';
import { TaskService } from './task.service';
import { Task } from './task.entity';

@Controller("tasks")
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  // TODO: add pagination (query params => page, limit)
  async findAll() {
    return await this.taskService.findAll();
  }

  @Get('id/:id')
  findOne(@Param('id') id: number) {
    return this.taskService.findOne(id);
  }

  @Post()
  async create(@Body() task: Partial<Task>) {
    return await this.taskService.create(task);
  }

  @Patch('id/:id')
  update(@Param('id') id: number, @Body() task: Partial<Task>): Promise<Task> {
    return this.taskService.update(id, task);
  }

  @Delete('id/:id')
  delete(@Param('id') id: number): Promise<void> {
    return this.taskService.delete(id);
  }
}