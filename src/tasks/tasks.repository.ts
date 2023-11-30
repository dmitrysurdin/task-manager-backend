import 'reflect-metadata';
import { ITasksRepository } from './tasks.repository.interface';
import { Task } from './tasks.entity';
import { TaskModel } from '../database/models/task/task.model';
import { injectable } from 'inversify';
import { HydratedDocument } from 'mongoose';
import { TasksCreateDto } from './dto/tasks-create.dto';

@injectable()
export class TasksRepository implements ITasksRepository {
	constructor() {}

	async create({ name, description }: Task): Promise<HydratedDocument<TasksCreateDto>> {
		return await TaskModel.create({ name, description });
	}

	async find(name: string): Promise<any> {
		return TaskModel.find({ name });
	}
}
