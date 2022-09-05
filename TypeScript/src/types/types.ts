export type ipObj = {
    ip: ipBin;
    subnet: ipBin;
    networkAddress: ipBin;
    broadcastAddress: ipBin;
    hostAddress: ipBin;
    cidr: number | undefined;
}

export type ipBin = bigint;

export type resultType = {
	source: {
		ip: string;
		subnet: string;
		netAddr: string;
		otherNetAddr: string;
	},
	dist: {
		ip: string;
		subnet: string;
		netAddr: string;
		otherNetAddr: string;
	},
	sourceToDist: boolean;
	distToSource: boolean;
};
