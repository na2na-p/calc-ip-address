// 引数を配列に格納する、
const args = process.argv.slice(2);

import { CalcRange } from '@modules/calcRange.js';

// 引数が2個ならtrue,4個ならfalseを返す。
// そうでなければErrorをthrowする。
if (args.length !== 2 && args.length !== 4) {
	throw new Error('正しい表示形式ではありません。CIDR形式と他の形式を混在させることはできません。');
}

if (args.length === 2) {
	const serverIp = new CalcRange(args[0]);
	const clientIp = new CalcRange(args[1]);
	console.log(serverIp.getBinIpObj());
	console.log(clientIp.getBinIpObj());
} else {
	const serverIp = new CalcRange(args[0], args[1]);
	const clientIp = new CalcRange(args[2], args[3]);
	console.log(serverIp.getBinIpObj());
	console.log(clientIp.getBinIpObj());
}