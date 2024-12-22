// tasks/task.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { Task } from './task.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Task])],  // Makes TaskRepository available
  controllers: [TaskController],                // Declare the controller here
  providers: [TaskService],                     // Declare the service here
})
export class TaskModule {}
