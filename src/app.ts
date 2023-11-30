import express, { Express } from 'express';
import 'reflect-metadata';
import { inject, injectable } from 'inversify';
import { Server } from 'http';
import { json } from 'body-parser';
import { TYPES } from './types';
import { ILoggerService } from './logger/logger.service.interface';
import { TasksController } from './tasks/tasks.controller';
import { MongoService } from './database/mongo.service';

@injectable()
export class App {
	app: Express;
	server: Server;
	port: number;
	constructor(
		@inject(TYPES.LoggerService) private loggerService: ILoggerService,
		@inject(TYPES.TasksController) private tasksController: TasksController,
		@inject(TYPES.MongoService) private mongoService: MongoService,
	) {
		this.app = express();
		this.server = new Server();
		this.port = Number(process.env.PORT);
	}

	private useRoutes(): void {
		this.app.use('/tasks', this.tasksController.router);
	}

	private useMiddleware(): void {
		this.app.use(json());
	}

	public async init(): Promise<void> {
		this.useMiddleware();
		this.useRoutes();
		await this.mongoService.connect();
		this.server = this.app.listen(this.port);
		this.loggerService.log(`Server is running on http://localhost:${this.port}`);
	}

	public close(): void {
		this.server.close();
	}
}
