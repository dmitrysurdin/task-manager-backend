import 'reflect-metadata';
import { Task } from './tasks.entity';
import { HydratedDocument } from 'mongoose';
import { TasksCreateDto } from './dto/tasks-create.dto';

export interface ITasksRepository {
	create: (task: Task) => Promise<HydratedDocument<TasksCreateDto>>;
	find: (name: string) => Promise<HydratedDocument<TasksCreateDto> | null>;
}
