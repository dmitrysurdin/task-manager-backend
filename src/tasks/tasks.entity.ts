export class Task {
	constructor(
		private readonly _name: string,
		private readonly _description: string,
	) {}

	get name(): string {
		return this._name;
	}

	get description(): string {
		return this._description;
	}
}
