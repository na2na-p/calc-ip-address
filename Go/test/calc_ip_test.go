package test

import (
	"math/big"
	"testing"
	"main"
)

func TestCalcIp(t *testing.T) {
	t.Run("CIDR形式での入力", func(t *testing.T) {
		inputWithCIDR := "172.16.0.254/16"
		calcWithCIDR := main.NewCalcIp(inputWithCIDR, "")

		if calcWithCIDR.ip.Cmp(big.NewInt(0b10101100000100000000000011111110)) != 0 {
			t.Errorf("IPを10進数に変換ができていない")
		}
		if calcWithCIDR.IpString() != "172.16.0.254" {
			t.Errorf("IPアドレスを元の10進表記に戻せていない")
		}
		if calcWithCIDR.subnet.Cmp(big.NewInt(0b11111111111111110000000000000000)) != 0 {
			t.Errorf("サブネットマスクを10進数に変換ができていない")
		}
		if calcWithCIDR.SubnetString() != "255.255.0.0" {
			t.Errorf("サブネットマスクを10進表記に戻せていない")
		}
		if calcWithCIDR.cidr != 16 {
			t.Errorf("マスクビットの取得ができていない")
		}
		if calcWithCIDR.networkAddress.Cmp(big.NewInt(0b10101100000100000000000000000000)) != 0 {
			t.Errorf("ネットワークアドレスの取得ができていない")
		}
		if calcWithCIDR.hostAddress.Cmp(big.NewInt(0b00000000000000001111111111111111)) != 0 {
			t.Errorf("ホストアドレス部の取得ができていない")
		}
		if calcWithCIDR.broadcastAddress.Cmp(big.NewInt(0b10101100000100001111111111111111)) != 0 {
			t.Errorf("ブロードキャストアドレスの取得ができていない")
		}
	})

	t.Run("IPアドレス + サブネットマスク形式での入力", func(t *testing.T) {
		inputIp := "10.128.32.1"
		inputSubnet := "255.0.0.0"
		calc := main.NewCalcIp(inputIp, inputSubnet)

		if calc.ip.Cmp(big.NewInt(0b00001010100000000010000000000001)) != 0 {
			t.Errorf("IPを10進数に変換ができていない")
		}
		if calc.IpString() != "10.128.32.1" {
			t.Errorf("IPアドレスを元の10進表記に戻せていない")
		}
		if calc.subnet.Cmp(big.NewInt(0b11111111000000000000000000000000)) != 0 {
			t.Errorf("サブネットマスクを10進数に変換ができていない")
		}
		if calc.SubnetString() != "255.0.0.0" {
			t.Errorf("サブネットマスクを元の10進表記に戻せていない")
		}
		if calc.networkAddress.Cmp(big.NewInt(0b00001010000000000000000000000000)) != 0 {
			t.Errorf("ネットワークアドレスの取得ができていない")
		}
		if calc.NetworkAddressString() != "10.0.0.0" {
			t.Errorf("ネットワークアドレスを10進表記に戻せていない")
		}
		if calc.hostAddress.Cmp(big.NewInt(0b00000000111111111111111111111111)) != 0 {
			t.Errorf("ホストアドレス部の取得ができていない")
		}
		if calc.broadcastAddress.Cmp(big.NewInt(0b00001010111111111111111111111111)) != 0 {
			t.Errorf("ブロードキャストアドレスの取得ができていない")
		}
	})
}
