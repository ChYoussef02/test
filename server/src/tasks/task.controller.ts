import { Controller, Get, Post, Delete, Param, Body, Patch, Query } from '@nestjs/common';
import { TaskService } from './task.service';
import { Task } from './task.entity';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiQuery } from '@nestjs/swagger';

@ApiTags('tasks')
@Controller("tasks")
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  @ApiOperation({ summary: 'Get all tasks' })
  @ApiResponse({ status: 200, description: 'Tasks retrieved successfully.' })
  @ApiQuery({ name: 'page', required: false, example: 1 })
  @ApiQuery({ name: 'limit', required: false, example: 10 })
  async findAll(@Query('page') page = 1, @Query('limit') limit = 10) {
    const paginationLimit = Math.min(limit, 100);
    return await this.taskService.findAll(page, paginationLimit);
  }


  @Post()
  @ApiOperation({ summary: 'Create a new task' })
  @ApiBody({ schema: { example: { title: 'New Task',description:'new description' } } })
  @ApiResponse({ status: 200, description: 'Task created successfully.' })
  async create(@Body() task: Partial<Task>) {
    return await this.taskService.create(task);
  }

  @Patch('id/:id')
  @ApiOperation({ summary: 'modify task' })
  @ApiResponse({ status: 200, description: 'Tasks modified successfully.' })
  update(@Param('id') id: number, @Body() task: Partial<Task>): Promise<Task> {
    return this.taskService.update(id, task);
  }

  @Delete('id/:id')
  @ApiOperation({ summary: 'delete task' })
    @ApiResponse({ status: 200, description: 'Tasks deleted successfully.' })
  delete(@Param('id') id: number): Promise<void> {
    return this.taskService.delete(id);
  }
}