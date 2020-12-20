export interface Label {
	id: string,
	sender: string,
	addressee: string,
	size: Size,
	poBox: string,
	sent: string
	_links: any
}

export enum Size {
	XS = 'XS',
	S = 'S',
	M = 'M',
	L = 'L',
	XL = 'XL'
}