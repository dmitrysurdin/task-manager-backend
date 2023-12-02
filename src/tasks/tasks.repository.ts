import 'reflect-metadata';
import { ITasksRepository } from './tasks.repository.interface';
import { Task } from './tasks.entity';
import { TaskModel } from '../database/models/task/task.model';
import { injectable } from 'inversify';
import { HydratedDocument } from 'mongoose';
import { TasksCreateDto } from './dto/tasks-create.dto';
import { DeleteResult } from 'mongodb';
import { TasksFindDto } from './dto/tasks-find.dto';
import { TasksUpdateDto } from './dto/tasks-update.dto';

@injectable()
export class TasksRepository implements ITasksRepository {
	async create({ name, description }: Task): Promise<HydratedDocument<TasksCreateDto> | null> {
		try {
			return await TaskModel.create({ name, description });
		} catch (e: unknown) {
			return null;
		}
	}

	async find(name?: string): Promise<HydratedDocument<TasksFindDto>[] | null> {
		try {
			if (!name) {
				return TaskModel.find();
			}
			return TaskModel.find({ name });
		} catch (error: unknown) {
			return null;
		}
	}

	async update({
		id,
		name,
		description,
	}: TasksUpdateDto): Promise<HydratedDocument<TasksUpdateDto> | null> {
		try {
			if (id.length !== 24) {
				return null;
			}
			return await TaskModel.findByIdAndUpdate({ _id: id }, { name, description }, { new: true });
		} catch (error: unknown) {
			return null;
		}
	}

	async deleteAll(): Promise<DeleteResult> {
		return TaskModel.deleteMany({});
	}

	async deleteById(id: string): Promise<DeleteResult> {
		return TaskModel.deleteOne({ id });
	}
}
