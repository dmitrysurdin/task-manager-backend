import 'reflect-metadata';
import { NextFunction, Response, Request } from 'express';

export interface ITasksController {
	getAll: (req: Request, res: Response, next: NextFunction) => Promise<void>;
	getById: (req: Request, res: Response, next: NextFunction) => Promise<void>;
	create: (req: Request, res: Response, next: NextFunction) => Promise<void>;
	delete: (req: Request, res: Response, next: NextFunction) => Promise<void>;
}
