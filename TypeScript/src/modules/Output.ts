import { resultType } from '@/types/types.js';

export class Output {
	constructor(result: resultType) {
		// console.log(result);
		process.stdout.write(`サーバ:\t\t${result.source.ip}\t${result.source.subnet}\n`);
		process.stdout.write(`クライアント:\t${result.dist.ip}\t${result.dist.subnet}\n`);
		process.stdout.write(`サーバ視点\t\tサーバNetAddr\t\t${result.source.netAddr}\n`);
		// TODO: もう一方のネットワークアドレスの導出
		process.stdout.write(`サーバ視点\t\tクライアントNetAddr\t${result.dist.netAddr}\n`);
		// TODO: もう一方のネットワークアドレスの導出
		process.stdout.write(`クライアント視点\tサーバNetAddr\t\t${result.source.netAddr}\n`);
		process.stdout.write(`クライアント視点\tクライアントNetAddr\t${result.dist.netAddr}\n`);
	}
}
