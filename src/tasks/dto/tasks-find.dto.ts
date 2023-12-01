import { Types } from 'mongoose';

export interface TasksFindDto {
	id: Types.ObjectId;
	name: string;
	description: string;
}
