export type ipObj = {
    ip: ipBin;
    subnet: ipBin;
    networkAddress: ipBin;
    broadcastAddress: ipBin;
    hostAddress: ipBin;
    cidr: number;
}

// ipBin型は、bigint型である。
export type ipBin = bigint;
