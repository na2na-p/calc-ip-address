import {expect} from 'chai';
import * as _mocha from 'mocha';

import {CalcIp} from '../built/modules/CalcIp.js';

// mochaを利用したテストコード
describe('モジュール群のテスト', () => {
	describe('CIDR形式でのインポート', () => {
		const input = '172.16.0.254/16';
		const calc = new CalcIp(input);
		it('IPを2進数表記にパースができている', () => {
			expect(calc.getBinIpObj().ip).deep.equal(BigInt(0b10101100000100000000000011111110));
		});
		it('サブネットマスクを2進数表記にパースができている', () => {
			expect(calc.getBinIpObj().subnet).deep.equal(BigInt(0b11111111111111110000000000000000));
		});
		it('マスクビットの取得ができる', () => {
			expect(calc.getBinIpObj().cidr).deep.equal(16);
		});
		it('ネットワークアドレスの取得ができる', () => {
			expect(calc.getBinIpObj().networkAddress).deep.equal(BigInt(0b10101100000100000000000000000000));
		});
		it('ホストアドレス部の取得ができる', () => {
			expect(calc.getBinIpObj().hostAddress).deep.equal(BigInt(0b00000000000000001111111111111111));
		});
		it('ブロードキャストアドレスの取得ができる', () => {
			expect(calc.getBinIpObj().broadcastAddress).deep.equal(BigInt(0b10101100000100001111111111111111));
		});
	});
});
