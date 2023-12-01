import { Types } from 'mongoose';

export interface TasksUpdateDto {
	id: Types.ObjectId;
	name: string;
	description: string;
}
