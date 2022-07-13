export {};

declare global {
	interface BigInt {
		addToDottedDecimalNotation(): string;
	}
}

// ipBin型にaddToDottedDecimalNotationメソッドを追加する。
BigInt.prototype.addToDottedDecimalNotation = function (): string {
	// 2進数表記で表されたIPアドレスを、3ケタ区切りの文字列に変換する。
	// 256進数と解釈できるのでいい感じにする。
	const ipString: string[] = [];
	let tempIp = this.valueOf();
	for (let i=4; i>0; i--) {
		const ip = tempIp / BigInt(256 ** (i - 1));
		tempIp = tempIp % BigInt(256 ** (i - 1));
		ipString.push(ip.toString());
		if ((i > 1)) {
			ipString.push('.');
		}
	}
	return ipString.join('');
};
