import express, { Express } from 'express';
import 'reflect-metadata';
import { inject, injectable } from 'inversify';
import { Server } from 'http';
import { json } from 'body-parser';
import { ILoggerService } from './logger/logger.service.interface';
import { TYPES } from './types';

@injectable()
export class App {
	app: Express;
	server: Server;
	port: number;
	constructor(@inject(TYPES.LoggerService) private logger: ILoggerService) {
		this.app = express();
		this.server = new Server();
		this.port = Number(process.env.PORT);
	}

	private useMiddleware(): void {
		this.app.use(json());
	}

	public async init(): Promise<void> {
		this.useMiddleware();
		this.server = this.app.listen(this.port);
		this.logger.log(`Server is running on http://localhost:${this.port}`);
	}
}
