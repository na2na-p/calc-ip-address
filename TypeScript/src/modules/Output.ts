import { resultType } from '@/types/types.js';

export class Output {
	constructor(result: resultType) {
		process.stdout.write(`サーバ:\t\t${result.source.ip}\t${result.source.subnet}\n`);
		process.stdout.write(`クライアント:\t${result.dist.ip}\t${result.dist.subnet}\n`);

		process.stdout.write(`サーバ視点\t\tサーバNetAddr\t\t${(() => {
			return result.result.sourceToDist
				? `\x1b[32m${result.source.netAddr}\x1b[0m`
				: `\x1b[31m${result.source.netAddr}\x1b[0m`;
		})()}\n`);

		process.stdout.write(`サーバ視点\t\tクライアントNetAddr\t${(() => {
			return result.result.sourceToDist
				? `\x1b[32m${result.source.otherNetAddr}\x1b[0m`
				: `\x1b[31m${result.source.otherNetAddr}\x1b[0m`;
		})()}\n`);

		process.stdout.write(`サーバ視点\t\tクラアントへ到達が可能\t${(() => {
			return result.result.sourceToDist
				? '\x1b[32mはい\x1b[0m'
				: '\x1b[31mいいえ\x1b[0m';
		})()}\n`);

		process.stdout.write(`クライアント視点\tサーバNetAddr\t\t${(() => {
			return result.result.distToSource
				? `\x1b[32m${result.dist.otherNetAddr}\x1b[0m`
				: `\x1b[31m${result.dist.otherNetAddr}\x1b[0m`;
		})()}\n`);

		process.stdout.write(`クライアント視点\tクライアントNetAddr\t${(() => {
			return result.result.distToSource
				? `\x1b[32m${result.dist.netAddr}\x1b[0m`
				: `\x1b[31m${result.dist.netAddr}\x1b[0m`;
		})()}\n`);

		process.stdout.write(`クライアント視点\tサーバへ到達が可能\t${(() => {
			return result.result.distToSource
				? '\x1b[32mはい\x1b[0m'
				: '\x1b[31mいいえ\x1b[0m';
		})()}\n`);
	}
}
