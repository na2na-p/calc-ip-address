package main

import (
	"fmt"
	"os"
	"strings"
)

func main() {
	args := os.Args[1:]

	if len(args) < 2 || len(args) > 4 || (len(args) == 2 && (!strings.Contains(args[0], "/") || !strings.Contains(args[1], "/"))) {
		fmt.Println("正しい表示形式ではありません。CIDR形式と他の形式を混在させることはできません。")
		return
	}

	var serverIp, clientIp *CalcIp

	if len(args) == 2 {
		serverIp = NewCalcIp(args[0], "")
		clientIp = NewCalcIp(args[1], "")
	} else {
		serverIp = NewCalcIp(args[0], args[1])
		clientIp = NewCalcIp(args[2], args[3])
	}

	result := NewCompare(serverIp, clientIp).Result()
	NewOutput(result)
}
