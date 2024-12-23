// app.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskModule } from './tasks/task.model';  // Import TaskModule here
import * as dotenv from "dotenv";
dotenv.config();

@Module({
  imports: [
    TypeOrmModule.forRoot({
        type: 'postgres',
        port: 5050,
        username: 'postgres',
        password: 'user',
        database: 'tasks',
        autoLoadEntities: true,
        synchronize: true,
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        logging: true,
    }),
    TaskModule, // Now only import TaskModule
  ],
})
export class AppModule {}
