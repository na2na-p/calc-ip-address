import { ipObj } from '@/types/types.js';

export class Compare {
	private server: ipObj;
	private client: ipObj;

	constructor(server: ipObj, client: ipObj) {
		this.server = server;
		this.client = client;
		
	}
}
