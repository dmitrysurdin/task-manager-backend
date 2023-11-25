import 'reflect-metadata';
import { inject, injectable } from 'inversify';
import { TYPES } from '../types';
import { ILoggerService } from '../logger/logger.service.interface';
import { BaseController } from '../common/base.controller';
import { ITasksController } from './tasks.controller.interface';
import { NextFunction, Request, Response } from 'express';

@injectable()
export class TasksController extends BaseController implements ITasksController {
	constructor(@inject(TYPES.LoggerService) private loggerService: ILoggerService) {
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

	async create(req: Request, res: Response, next: NextFunction): Promise<void> {}
	async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {}
	async getById(req: Request, res: Response, next: NextFunction): Promise<void> {}
	async delete(req: Request, res: Response, next: NextFunction): Promise<void> {}
}
