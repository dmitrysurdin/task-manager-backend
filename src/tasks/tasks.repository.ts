import 'reflect-metadata';
import { ITasksRepository } from './tasks.repository.interface';
import { Task } from './tasks.entity';
import { TaskModel } from '../database/models/task/task.model';
import { injectable } from 'inversify';
import { HydratedDocument } from 'mongoose';
import { TasksCreateDto } from './dto/tasks-create.dto';
import { DeleteResult } from 'mongodb';
import { TasksFindDto } from './dto/tasks-find.dto';

@injectable()
export class TasksRepository implements ITasksRepository {
	async create({ name, description }: Task): Promise<HydratedDocument<TasksCreateDto>> {
		return await TaskModel.create({ name, description });
	}

	async find(name?: string): Promise<HydratedDocument<TasksFindDto>[] | null> {
		if (!name) {
			return TaskModel.find();
		}
		return TaskModel.find({ name });
	}

	async deleteAll(): Promise<DeleteResult> {
		return TaskModel.deleteMany({});
	}

	async deleteById(id: string): Promise<DeleteResult> {
		return TaskModel.deleteOne({ id });
	}
}
