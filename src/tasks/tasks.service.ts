import 'reflect-metadata';
import { ITasksService } from './tasks.service.interface';
import { TasksCreateDto } from './dto/tasks-create.dto';
import { inject, injectable } from 'inversify';
import { TYPES } from '../types';
import { ITasksRepository } from './tasks.repository.interface';
import { Task } from './tasks.entity';
import { HydratedDocument } from 'mongoose';

@injectable()
export class TasksService implements ITasksService {
	constructor(@inject(TYPES.TasksRepository) private taskRepository: ITasksRepository) {}

	async createTask({
		name,
		description,
	}: TasksCreateDto): Promise<HydratedDocument<TasksCreateDto> | null> {
		const newTask = new Task(name, description);
		return await this.taskRepository.create(newTask);
	}
}
