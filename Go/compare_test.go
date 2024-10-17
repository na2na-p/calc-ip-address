package main

import (
	"testing"
)

func TestCompare(t *testing.T) {
	t.Run("正常系", func(t *testing.T) {
		t.Run("双方ともに疎通可能", func(t *testing.T) {
			server := NewCalcIp("192.168.1.1", "255.255.255.0")
			client := NewCalcIp("192.168.1.2", "255.255.255.0")
			compare := NewCompare(server, client)
			result := compare.Result()

			if !result.SourceToDist {
				t.Errorf("疎通確認結果: source -> dist が期待と異なります")
			}
			if !result.DistToSource {
				t.Errorf("疎通確認結果: dist -> source が期待と異なります")
			}
		})

		t.Run("双方ともに疎通不可", func(t *testing.T) {
			server := NewCalcIp("192.168.1.1", "255.255.255.0")
			client := NewCalcIp("192.168.2.1", "255.255.255.0")
			compare := NewCompare(server, client)
			result := compare.Result()

			if result.SourceToDist {
				t.Errorf("疎通確認結果: source -> dist が期待と異なります")
			}
			if result.DistToSource {
				t.Errorf("疎通確認結果: dist -> source が期待と異なります")
			}
		})

		t.Run("サーバからクライアントのみ通信可", func(t *testing.T) {
			server := NewCalcIp("192.168.1.1", "255.255.0.0")
			client := NewCalcIp("192.168.2.1", "255.255.255.0")
			compare := NewCompare(server, client)
			result := compare.Result()

			if !result.SourceToDist {
				t.Errorf("疎通確認結果: source -> dist が期待と異なります")
			}
			if result.DistToSource {
				t.Errorf("疎通確認結果: dist -> source が期待と異なります")
			}
		})
	})

	t.Run("異常系", func(t *testing.T) {
		t.Run("どちらか片方のIPがネットワークアドレス", func(t *testing.T) {
			server := NewCalcIp("192.168.1.0", "255.255.255.0")
			client := NewCalcIp("192.168.1.1", "255.255.255.0")
			compare := NewCompare(server, client)
			result := compare.Result()

			if result.SourceToDist {
				t.Errorf("疎通確認結果: source -> dist が期待と異なります")
			}
			if result.DistToSource {
				t.Errorf("疎通確認結果: dist -> source が期待と異なります")
			}
		})

		t.Run("どちらか片方のIPがブロードキャストアドレス", func(t *testing.T) {
			server := NewCalcIp("192.168.1.255", "255.255.255.0")
			client := NewCalcIp("192.168.1.1", "255.255.255.0")
			compare := NewCompare(server, client)
			result := compare.Result()

			if result.SourceToDist {
				t.Errorf("疎通確認結果: source -> dist が期待と異なります")
			}
			if result.DistToSource {
				t.Errorf("疎通確認結果: dist -> source が期待と異なります")
			}
		})

		t.Run("どちらのIPも同一", func(t *testing.T) {
			server := NewCalcIp("192.168.1.1", "255.255.255.0")
			client := NewCalcIp("192.168.1.1", "255.255.255.0")
			compare := NewCompare(server, client)
			result := compare.Result()

			if result.SourceToDist {
				t.Errorf("疎通確認結果: source -> dist が期待と異なります")
			}
			if result.DistToSource {
				t.Errorf("疎通確認結果: dist -> source が期待と異なります")
			}
		})
	})
}
