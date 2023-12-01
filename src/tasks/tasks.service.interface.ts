import 'reflect-metadata';
import { TasksCreateDto } from './dto/tasks-create.dto';
import { HydratedDocument } from 'mongoose';
import { TasksDeleteAllDto } from './dto/tasks-delete-all.dto';
import { TasksDeleteByNameDto } from './dto/tasks-delete-by-name.dto';
import { TasksFindDto } from './dto/tasks-find.dto';

export interface ITasksService {
	createTask: (dto: TasksCreateDto) => Promise<HydratedDocument<TasksCreateDto> | null>;
	getAllTasks: () => Promise<TasksFindDto[] | null>;
	deleteTaskByName: (dto: TasksDeleteByNameDto) => Promise<{ deletedCount: number } | null>;
	deleteAllTasks: () => Promise<TasksDeleteAllDto | null>;
}
