import 'reflect-metadata';
import { injectable } from 'inversify';
import { Logger, ILogObj } from 'tslog';
import { ILoggerService } from './logger.service.interface';

@injectable()
export class LoggerService implements ILoggerService {
	logger: Logger<ILogObj>;
	constructor() {
		this.logger = new Logger();
	}

	log(...arg: unknown[]): void {
		this.logger.info(...arg);
	}
	warn(...arg: unknown[]): void {
		this.logger.warn(...arg);
	}
	error(...arg: unknown[]): void {
		this.logger.error(...arg);
	}
}
