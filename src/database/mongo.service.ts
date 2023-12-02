import mongoose from 'mongoose';
import { inject, injectable } from 'inversify';
import { ILoggerService } from '../logger/logger.service.interface';
import { TYPES } from '../types';

@injectable()
export class MongoService {
	DB_URI: string;
	constructor(@inject(TYPES.LoggerService) private logger: ILoggerService) {
		this.DB_URI = process.env.MONGODB_URI ?? '';
	}
	public async connect(): Promise<void> {
		try {
			await mongoose.connect(this.DB_URI);
			this.logger.log('[MongoService] Data base is successfully connected');
		} catch (e) {
			if (e instanceof Error) {
				this.logger.error('[MongoService] Data base connection error' + e.message);
			}
		}
	}

	async disconnect(): Promise<void> {
		try {
			await mongoose.disconnect();
			this.logger.log('[MongoService] Data base is successfully disconnected');
		} catch (e) {
			if (e instanceof Error) {
				this.logger.error('[MongoService] Data base disconnection error' + e.message);
			}
		}
	}
}
