import { CalcIp } from './CalcIp.js';

import { resultType } from '@/types/types.js';


export class Compare {
	private source: CalcIp;
	private dist: CalcIp;
	public result: resultType;

	constructor(source: CalcIp, dist: CalcIp) {
		this.source = source;
		this.dist = dist;

		this.result = {
			source: {
				ip: this.source.ipString(),
				subnet: this.source.subnetString(),
				netAddr: this.source.networkAddressString()
			},
			dist: {
				ip: this.dist.ipString(),
				subnet: this.dist.subnetString(),
				netAddr: this.dist.networkAddressString()
			},
			result: {
				sourceToDist: this.checkCanReach(this.source, this.dist),
				distToSource: this.checkCanReach(this.dist ,this.source)
			}
		};
	}

	private checkCanReach(myHost: CalcIp, distHost: CalcIp): boolean {
		// 自身がネットワークアドレス or ブロードキャストアドレスの場合はfalse

		if (myHost.ip === myHost.networkAddress || myHost.ip === myHost.broadcastAddress) {
			return false;
		}

		// networkAddress <= host <= broadcastAddress
		if (myHost.networkAddress < distHost.ip && distHost.ip < myHost.broadcastAddress) {
			return true;
		}

		return false;
	}
}
