import { Types } from 'mongoose';

export interface TasksUpdateDto {
	id: string;
	name: string;
	description: string;
}
