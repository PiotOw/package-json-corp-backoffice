export interface Package {
	id: string,
	status: Status,
	labelId: string
}

export enum Status {
	IN_TRANSIT = 'IN_TRANSIT',
	DELIVERED = 'DELIVERED',
	PICKED_UP = 'PICKED_UP'
}