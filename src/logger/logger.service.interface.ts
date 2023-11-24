import { Logger, ILogObj } from 'tslog';

export interface ILoggerService {
	logger: Logger<ILogObj>;
	log: (...arg: unknown[]) => void;
	error: (...arg: unknown[]) => void;
	warn: (...arg: unknown[]) => void;
}
