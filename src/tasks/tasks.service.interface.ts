import 'reflect-metadata';
import { TasksCreateDto } from './dto/tasks-create.dto';
import { HydratedDocument } from 'mongoose';
import { TasksDeleteAllDto } from './dto/tasks-delete-all.dto';
import { TasksDeleteByIdDto } from './dto/tasks-delete-by-id.dto';
import { TasksFindDto } from './dto/tasks-find.dto';

export interface ITasksService {
	createTask: (dto: TasksCreateDto) => Promise<HydratedDocument<TasksCreateDto> | null>;
	getAllTasks: () => Promise<TasksFindDto[] | null>;
	deleteTaskById: (dto: TasksDeleteByIdDto) => Promise<{ deletedCount: number } | null>;
	deleteAllTasks: () => Promise<TasksDeleteAllDto | null>;
}
