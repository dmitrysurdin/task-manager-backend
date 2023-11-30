import mongoose from 'mongoose';

const TasksSchema = new mongoose.Schema({
	name: { type: String, required: true },
	description: { type: String, required: true },
});

export const TaskModel = mongoose.model('Task', TasksSchema);
