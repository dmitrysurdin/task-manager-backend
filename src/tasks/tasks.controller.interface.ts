import 'reflect-metadata';
import { NextFunction, Response, Request } from 'express';

export interface ITasksController {
	create: (req: Request, res: Response, next: NextFunction) => Promise<void>;
	getAll: (req: Request, res: Response, next: NextFunction) => Promise<void>;
	deleteById: (req: Request, res: Response, next: NextFunction) => Promise<void>;
	deleteAll: (req: Request, res: Response, next: NextFunction) => Promise<void>;
}
