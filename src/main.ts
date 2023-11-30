import { Container, ContainerModule, interfaces } from 'inversify';
import 'dotenv/config';
import { App } from './app';
import { TYPES } from './types';
import { ILoggerService } from './logger/logger.service.interface';
import { LoggerService } from './logger/logger.service';
import { ITasksController } from './tasks/tasks.controller.interface';
import { TasksController } from './tasks/tasks.controller';
import { MongoService } from './database/mongo.service';
import { ITasksService } from './tasks/tasks.service.interface';
import { TasksService } from './tasks/tasks.service';
import { ITasksRepository } from './tasks/tasks.repository.interface';
import { TasksRepository } from './tasks/tasks.repository';

export interface IBootstrapReturn {
	appContainer: Container;
	app: App;
}

const containerBindings = new ContainerModule((bind: interfaces.Bind) => {
	bind<App>(TYPES.Application).to(App).inSingletonScope();
	bind<ILoggerService>(TYPES.LoggerService).to(LoggerService).inSingletonScope();
	bind<MongoService>(TYPES.MongoService).to(MongoService).inSingletonScope();
	bind<ITasksController>(TYPES.TasksController).to(TasksController).inSingletonScope();
	bind<ITasksRepository>(TYPES.TasksRepository).to(TasksRepository).inSingletonScope();
	bind<ITasksService>(TYPES.TasksService).to(TasksService).inSingletonScope();
});

async function bootstrap(): Promise<IBootstrapReturn> {
	const container = new Container();
	container.load(containerBindings);
	const app = container.get<App>(TYPES.Application);
	await app.init();
	return { appContainer: container, app };
}

export const boot = bootstrap();
