export {};

declare global {
	interface Number {
		addToDottedDecimalNotation(): string;
	}
}

// ipBin型にaddToDottedDecimalNotationメソッドを追加する。
Number.prototype.addToDottedDecimalNotation = function (): string {
	// 2進数表記で表されたIPアドレスを、3ケタ区切りの文字列に変換する。
	// return this.toString(2).padStart(32, '0').match(/.{8}/g)!.map((v) => parseInt(v, 2).toString()).join('.');
	return 
};
