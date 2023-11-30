import 'reflect-metadata';
import { TasksCreateDto } from './dto/tasks-create.dto';
import { HydratedDocument } from 'mongoose';

export interface ITasksService {
	createTask: (dto: TasksCreateDto) => Promise<HydratedDocument<TasksCreateDto> | null>;
}
