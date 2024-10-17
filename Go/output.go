package main

import (
	"fmt"
)

type Output struct {
	result ResultType
}

func NewOutput(result ResultType) *Output {
	o := &Output{result: result}
	o.printResult()
	return o
}

func (o *Output) printResult() {
	fmt.Printf("サーバ:\t\t%s\t%s\n", o.result.Source.Ip, o.result.Source.Subnet)
	fmt.Printf("クライアント:\t%s\t%s\n", o.result.Dist.Ip, o.result.Dist.Subnet)

	fmt.Printf("サーバ視点\t\tサーバNetAddr\t\t%s\n", o.colorize(o.result.Source.NetAddr, o.result.SourceToDist))
	fmt.Printf("サーバ視点\t\tクライアントNetAddr\t%s\n", o.colorize(o.result.Source.OtherNetAddr, o.result.SourceToDist))
	fmt.Printf("サーバ視点\t\tクラアントへ到達が可能\t%s\n", o.colorizeBool(o.result.SourceToDist))

	fmt.Printf("クライアント視点\tサーバNetAddr\t\t%s\n", o.colorize(o.result.Dist.OtherNetAddr, o.result.DistToSource))
	fmt.Printf("クライアント視点\tクライアントNetAddr\t%s\n", o.colorize(o.result.Dist.NetAddr, o.result.DistToSource))
	fmt.Printf("クライアント視点\tサーバへ到達が可能\t%s\n", o.colorizeBool(o.result.DistToSource))
}

func (o *Output) colorize(text string, condition bool) string {
	if condition {
		return fmt.Sprintf("\x1b[32m%s\x1b[0m", text)
	}
	return fmt.Sprintf("\x1b[31m%s\x1b[0m", text)
}

func (o *Output) colorizeBool(condition bool) string {
	if condition {
		return "\x1b[32mはい\x1b[0m"
	}
	return "\x1b[31mいいえ\x1b[0m"
}
