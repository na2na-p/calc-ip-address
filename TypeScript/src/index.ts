// 引数を配列に格納する、
const args = process.argv.slice(2);

import { CalcIp } from '@modules/CalcIp.js';
import { Compare } from '@modules/Compare.js';
import { Output } from '@modules/Output.js';

// 引数が2個ならtrue,4個ならfalseを返す。
// そうでなければErrorをthrowする。
if (args.length < 2 || args.length > 4 || (args.length == 2 && (!(args[0].includes('/')) || !(args[1].includes('/'))))) {
	throw new Error('正しい表示形式ではありません。CIDR形式と他の形式を混在させることはできません。');
}

// TODO: 動的にやる(CIDRとそうでないの混在に対応させる。)

const serverIp = (() => {
	if (args.length === 2) {
		return new CalcIp(args[0]);
	} else {
		return new CalcIp(args[0], args[1]);
	}
})();

const clientIp = (() => {
	if (args.length === 2) {
		return new CalcIp(args[1]);
	} else {
		return new CalcIp(args[2], args[3]);
	}
})();

new Output((new Compare(serverIp, clientIp)).result);
