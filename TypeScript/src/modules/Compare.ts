import { CalcIp } from './CalcIp.js';

export class Compare {
	private server: CalcIp;
	private client: CalcIp;

	constructor(server: CalcIp, client: CalcIp) {
		this.server = server;
		this.client = client;
		
	}
}
