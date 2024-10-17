package main

import (
	"fmt"
	"math/big"
	"strings"
)

type CalcIp struct {
	ip              *big.Int
	subnet          *big.Int
	cidr            int
	networkAddress  *big.Int
	broadcastAddress *big.Int
	hostAddress     *big.Int
}

func NewCalcIp(ip string, subnet string) *CalcIp {
	c := &CalcIp{}
	if subnet == "" {
		cidr := strings.Split(ip, "/")[1]
		c.subnet = c.parseSubnetFromCidr(cidr)
		c.cidr = int(c.subnet.BitLen())
		ipStr := strings.Split(ip, "/")[0]
		c.ip = c.parseIp(ipStr)
	} else {
		c.subnet = c.parseSubnet(subnet)
		c.ip = c.parseIp(ip)
	}

	c.networkAddress = new(big.Int).And(c.ip, c.subnet)
	c.hostAddress = new(big.Int).Xor(c.subnet, big.NewInt(4294967295))
	c.broadcastAddress = new(big.Int).Or(c.networkAddress, c.hostAddress)

	return c
}

func (c *CalcIp) parseSubnet(subnet string) *big.Int {
	return c.parseIp(subnet)
}

func (c *CalcIp) parseSubnetFromCidr(cidr string) *big.Int {
	cidrInt := new(big.Int)
	cidrInt.SetString(cidr, 10)
	return new(big.Int).Lsh(big.NewInt(1), uint(32-cidrInt.Int64()))
}

func (c *CalcIp) parseIp(ip string) *big.Int {
	parts := strings.Split(ip, ".")
	ipInt := big.NewInt(0)
	for i, part := range parts {
		partInt := new(big.Int)
		partInt.SetString(part, 10)
		ipInt.Or(ipInt, new(big.Int).Lsh(partInt, uint(8*(3-i))))
	}
	return ipInt
}

func (c *CalcIp) IpString() string {
	return c.addToDottedDecimalNotation(c.ip)
}

func (c *CalcIp) SubnetString() string {
	return c.addToDottedDecimalNotation(c.subnet)
}

func (c *CalcIp) NetworkAddressString() string {
	return c.addToDottedDecimalNotation(c.networkAddress)
}

func (c *CalcIp) addToDottedDecimalNotation(ip *big.Int) string {
	ipString := ""
	for i := 3; i >= 0; i-- {
		part := new(big.Int).Rsh(ip, uint(8*i))
		ipString += part.String()
		if i > 0 {
			ipString += "."
		}
	}
	return ipString
}
