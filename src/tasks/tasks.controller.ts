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
				path: '/getAll',
				method: 'get',
				func: this.getAll,
				middlewares: [],
			},
			{
				path: '/getById',
				method: 'get',
				func: this.getById,
				middlewares: [],
			},
			{
				path: '/delete',
				method: 'delete',
				func: this.delete,
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
		this.ok(res, { name: result.name, description: result.description });
	}
	async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {}
	async getById(req: Request, res: Response, next: NextFunction): Promise<void> {}
	async delete(req: Request, res: Response, next: NextFunction): Promise<void> {}
}
