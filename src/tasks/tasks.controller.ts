import 'reflect-metadata';
import { inject, injectable } from 'inversify';
import { TYPES } from '../types';
import { ILoggerService } from '../logger/logger.service.interface';
import { BaseController } from '../common/base.controller';
import { ITasksController } from './tasks.controller.interface';
import { NextFunction, Request, Response } from 'express';
import { ITasksService } from './tasks.service.interface';
import { HTTPError } from '../errors/http-error.class';
import { TasksCreateDto } from './dto/tasks-create.dto';

@injectable()
export class TasksController extends BaseController implements ITasksController {
	constructor(
		@inject(TYPES.LoggerService) private loggerService: ILoggerService,
		@inject(TYPES.TasksService) private taskService: ITasksService,
	) {
		super(loggerService);
		this.bindRoutes([
			{
				path: '/create',
				method: 'post',
				func: this.create,
				middlewares: [],
			},
			{
				path: '/update/:id',
				method: 'patch',
				func: this.update,
				middlewares: [],
			},
			{
				path: '/getAll',
				method: 'get',
				func: this.getAll,
				middlewares: [],
			},
			{
				path: '/delete/:name',
				method: 'delete',
				func: this.deleteById,
				middlewares: [],
			},
			{
				path: '/deleteAll',
				method: 'delete',
				func: this.deleteAll,
				middlewares: [],
			},
		]);
	}

	async create(
		{ body }: Request<{}, {}, TasksCreateDto>,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		const result = await this.taskService.createTask({
			name: body.name,
			description: body.description,
		});
		if (!result) {
			return next(new HTTPError(422, 'This task has already been created'));
		}
		this.ok(res, { name: result.name, description: result.description, id: result._id });
	}

	async update({ body, params }: Request, res: Response, next: NextFunction): Promise<void> {
		const updatedTask = await this.taskService.updateTask({
			id: params.id,
			name: body.name,
			description: body.description,
		});
		if (!updatedTask) {
			return next(new HTTPError(404, 'Task with given id does not exist'));
		}
		this.ok(res, {
			id: updatedTask.id,
			name: updatedTask.name,
			description: updatedTask.description,
		});
	}

	async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
		const tasks = await this.taskService.getAllTasks();
		if (!tasks) {
			return next(new HTTPError(500, 'Internal server error'));
		}
		this.ok(res, tasks);
	}

	async deleteById({ params }: Request, res: Response, next: NextFunction): Promise<void> {
		const deletedResult = await this.taskService.deleteTaskById({ id: params.id });
		if (!deletedResult) {
			return next(new HTTPError(404, 'Can not delete this task'));
		}
		this.ok(res, { deletedCount: deletedResult.deletedCount });
	}

	async deleteAll(req: Request, res: Response, next: NextFunction): Promise<void> {
		const deletedResult = await this.taskService.deleteAllTasks();
		if (!deletedResult) {
			return next(new HTTPError(404, 'Can not delete all tasks'));
		}
		this.ok(res, { deleteCount: deletedResult.deletedCount });
	}
}
