package main

import (
	"math/big"
)

type Compare struct {
	source *CalcIp
	dist   *CalcIp
	result ResultType
}

type ResultType struct {
	Source       IpInfo
	Dist         IpInfo
	SourceToDist bool
	DistToSource bool
}

type IpInfo struct {
	Ip          string
	Subnet      string
	NetAddr     string
	OtherNetAddr string
}

func NewCompare(source *CalcIp, dist *CalcIp) *Compare {
	c := &Compare{
		source: source,
		dist:   dist,
	}

	c.result = ResultType{
		Source: IpInfo{
			Ip:          source.IpString(),
			Subnet:      source.SubnetString(),
			NetAddr:     source.NetworkAddressString(),
			OtherNetAddr: c.calcOtherNetAddr(source, dist),
		},
		Dist: IpInfo{
			Ip:          dist.IpString(),
			Subnet:      dist.SubnetString(),
			NetAddr:     dist.NetworkAddressString(),
			OtherNetAddr: c.calcOtherNetAddr(dist, source),
		},
		SourceToDist: c.checkCanReach(source, dist),
		DistToSource: c.checkCanReach(dist, source),
	}

	return c
}

func (c *Compare) checkCanReach(myHost *CalcIp, distHost *CalcIp) bool {
	if myHost.ip.Cmp(myHost.networkAddress) == 0 || myHost.ip.Cmp(myHost.broadcastAddress) == 0 {
		return false
	}

	if myHost.ip.Cmp(distHost.ip) == 0 {
		return false
	}

	if myHost.networkAddress.Cmp(distHost.ip) < 0 && distHost.ip.Cmp(myHost.broadcastAddress) < 0 {
		return true
	}

	return false
}

func (c *Compare) calcOtherNetAddr(myHost *CalcIp, distHost *CalcIp) string {
	otherNetAddr := new(big.Int).And(distHost.ip, myHost.subnet)
	return myHost.addToDottedDecimalNotation(otherNetAddr)
}

func (c *Compare) Result() ResultType {
	return c.result
}
