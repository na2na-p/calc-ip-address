package main

import (
	"testing"
)

func TestOutput(t *testing.T) {
	t.Run("正常系", func(t *testing.T) {
		t.Run("疎通可能な場合", func(t *testing.T) {
			server := NewCalcIp("192.168.1.1", "255.255.255.0")
			client := NewCalcIp("192.168.1.2", "255.255.255.0")
			compare := NewCompare(server, client)
			result := compare.Result()
			output := NewOutput(result)

			if output.result.SourceToDist != true {
				t.Errorf("疎通確認結果: source -> dist が期待と異なります")
			}
			if output.result.DistToSource != true {
				t.Errorf("疎通確認結果: dist -> source が期待と異なります")
			}
		})

		t.Run("疎通不可な場合", func(t *testing.T) {
			server := NewCalcIp("192.168.1.1", "255.255.255.0")
			client := NewCalcIp("192.168.2.1", "255.255.255.0")
			compare := NewCompare(server, client)
			result := compare.Result()
			output := NewOutput(result)

			if output.result.SourceToDist != false {
				t.Errorf("疎通確認結果: source -> dist が期待と異なります")
			}
			if output.result.DistToSource != false {
				t.Errorf("疎通確認結果: dist -> source が期待と異なります")
			}
		})
	})
}
