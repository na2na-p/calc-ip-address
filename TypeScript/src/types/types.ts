export type ipObj = {
    ip: number;
    subnet: number;
    networkAddress: number;
    broadcastAddress: number;
    hostAddress: number;
    cidr: number;
}

// ipBin型は、bigint型である。
export type ipBin = bigint;
