import 'reflect-metadata';
import { Task } from './tasks.entity';
import { HydratedDocument } from 'mongoose';
import { TasksCreateDto } from './dto/tasks-create.dto';
import { DeleteResult } from 'mongodb';
import { TasksFindDto } from './dto/tasks-find.dto';

export interface ITasksRepository {
	create: (task: Task) => Promise<HydratedDocument<TasksCreateDto>>;
	find: (name?: string) => Promise<HydratedDocument<TasksFindDto>[] | null>;
	deleteByName: (name: string) => Promise<DeleteResult>;
	deleteAll: () => Promise<DeleteResult>;
}
