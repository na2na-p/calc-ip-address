// 引数を配列に格納する、
const args = process.argv.slice(2);

import { CalcIp } from '@modules/CalcIp.js';
import { Compare } from '@modules/Compare.js';

// 引数が2個ならtrue,4個ならfalseを返す。
// そうでなければErrorをthrowする。
if (args.length < 2 || args.length > 4) {
	throw new Error('正しい表示形式ではありません。CIDR形式と他の形式を混在させることはできません。');
}

// TODO: 動的にやる(CIDRとそうでないの混在に対応させる。)
if (args.length === 2) {
	const serverIp = new CalcIp(args[0]);
	const clientIp = new CalcIp(args[1]);
	const compare = new Compare(serverIp, clientIp);
	console.log(compare.result);
} else {
	const serverIp = new CalcIp(args[0], args[1]);
	const clientIp = new CalcIp(args[2], args[3]);
	const compare = new Compare(serverIp, clientIp);
}
