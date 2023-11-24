import { Container, ContainerModule, interfaces } from 'inversify';
import 'dotenv/config';
import { App } from './app';
import { TYPES } from './types';
import { ILoggerService } from './logger/logger.service.interface';
import { LoggerService } from './logger/logger.service';

export interface IBootstrapReturn {
	appContainer: Container;
	app: App;
}

const containerBindings = new ContainerModule((bind: interfaces.Bind) => {
	bind<App>(TYPES.Application).to(App);
	bind<ILoggerService>(TYPES.LoggerService).to(LoggerService);
});

async function bootstrap(): Promise<IBootstrapReturn> {
	const container = new Container();
	container.load(containerBindings);
	const app = container.get<App>(TYPES.Application);
	await app.init();
	return { appContainer: container, app };
}

export const boot = bootstrap();
