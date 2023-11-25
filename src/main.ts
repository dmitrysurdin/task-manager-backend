import { Container, ContainerModule, interfaces } from 'inversify';
import 'dotenv/config';
import { App } from './app';
import { TYPES } from './types';
import { ILoggerService } from './logger/logger.service.interface';
import { LoggerService } from './logger/logger.service';
import { ITasksController } from './tasks/tasks.controller.interface';
import { TasksController } from './tasks/tasks.controller';

export interface IBootstrapReturn {
	appContainer: Container;
	app: App;
}

const containerBindings = new ContainerModule((bind: interfaces.Bind) => {
	bind<App>(TYPES.Application).to(App).inSingletonScope();
	bind<ILoggerService>(TYPES.LoggerService).to(LoggerService).inSingletonScope();
	bind<ITasksController>(TYPES.TasksController).to(TasksController).inSingletonScope();
});

async function bootstrap(): Promise<IBootstrapReturn> {
	const container = new Container();
	container.load(containerBindings);
	const app = container.get<App>(TYPES.Application);
	await app.init();
	return { appContainer: container, app };
}

export const boot = bootstrap();
