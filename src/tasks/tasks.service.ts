import 'reflect-metadata';
import { ITasksService } from './tasks.service.interface';
import { TasksCreateDto } from './dto/tasks-create.dto';
import { inject, injectable } from 'inversify';
import { TYPES } from '../types';
import { ITasksRepository } from './tasks.repository.interface';
import { Task } from './tasks.entity';
import { HydratedDocument } from 'mongoose';
import { TasksDeleteAllDto } from './dto/tasks-delete-all.dto';
import { TasksDeleteByIdDto } from './dto/tasks-delete-by-id.dto';
import { TasksFindDto } from './dto/tasks-find.dto';
import { TasksUpdateDto } from './dto/tasks-update.dto';

@injectable()
export class TasksService implements ITasksService {
	constructor(@inject(TYPES.TasksRepository) private taskRepository: ITasksRepository) {}

	async createTask({
		name,
		description,
	}: TasksCreateDto): Promise<HydratedDocument<TasksCreateDto> | null> {
		const newTask = new Task(name, description);
		const existedTask = await this.taskRepository.find(name);
		if (existedTask?.length) {
			return null;
		}
		return await this.taskRepository.create(newTask);
	}

	async updateTask(task: TasksUpdateDto): Promise<TasksUpdateDto | null> {
		const updatedTask = await this.taskRepository.update(task);
		if (!updatedTask) {
			return null;
		}
		return updatedTask;
	}

	async getAllTasks(): Promise<TasksFindDto[] | null> {
		const existedTasks = await this.taskRepository.find();
		if (!existedTasks) {
			return null;
		}
		return existedTasks.map((task) => ({
			id: task._id,
			name: task.name,
			description: task.description,
		}));
	}

	async deleteTaskById({ id }: TasksDeleteByIdDto): Promise<{ deletedCount: number } | null> {
		const deletedResult = await this.taskRepository.deleteById(id);
		if (!deletedResult?.acknowledged) {
			return null;
		}
		return { deletedCount: deletedResult.deletedCount };
	}

	async deleteAllTasks(): Promise<TasksDeleteAllDto | null> {
		const deletedResult = await this.taskRepository.deleteAll();
		if (!deletedResult.acknowledged) {
			return null;
		}
		return { deletedCount: deletedResult.deletedCount };
	}
}
