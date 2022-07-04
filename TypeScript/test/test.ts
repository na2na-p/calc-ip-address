import {expect} from 'chai';
import {describe, it} from 'mocha';

import {CalcIp} from '../built/modules/CalcIp.js';
import '../built/extensions/bigint.extensions.js';

// mochaを利用したテストコード
describe('CalcIpクラスのテスト', () => {
	describe('CIDR形式での入力', () => {
		const input = '172.16.0.254/16';
		const calc = new CalcIp(input);
		it('IPを2進数表記にパースができている', () => {
			expect(calc.getBinIpObj().ip).deep.equal(BigInt(0b10101100000100000000000011111110));
		});
		it('IPアドレスを元の10進表記に戻せる', () => {
			expect(calc.getBinIpObj().ip.addToDottedDecimalNotation()).deep.equal('172.16.0.254');
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
		it('ホストアドレス部を10進表記にできる', () => {
			expect(calc.getBinIpObj().hostAddress.addToDottedDecimalNotation()).deep.equal('0.0.255.255');
		});
		it('ブロードキャストアドレスの取得ができる', () => {
			expect(calc.getBinIpObj().broadcastAddress).deep.equal(BigInt(0b10101100000100001111111111111111));
		});
	});
	describe('IPアドレス + サブネットマスク形式での入力', () => {
		const inputIp = '10.128.32.1';
		const inputSubnet = '255.240.0.0';
		const calc = new CalcIp(inputIp, inputSubnet);
		it('IPを2進数表記にパースができている', () => {
			expect(calc.getBinIpObj().ip).deep.equal(BigInt(0b00001010100000000010000000000001));
		});
		it('サブネットマスクを2進数表記にパースができている', () => {
			expect(calc.getBinIpObj().subnet).deep.equal(BigInt(0b11111111111100000000000000000000));
		});
		it('マスクビットの取得ができる', () => {
			expect(calc.getBinIpObj().cidr).deep.equal(12);
		});
		it('ネットワークアドレスの取得ができる', () => {
			expect(calc.getBinIpObj().networkAddress).deep.equal(BigInt(0b00001010100000000000000000000000));
		});
		it('ホストアドレス部の取得ができる', () => {
			expect(calc.getBinIpObj().hostAddress).deep.equal(BigInt(0b00000000000011111111111111111111));
		});
		it('ブロードキャストアドレスの取得ができる', () => {
			expect(calc.getBinIpObj().broadcastAddress).deep.equal(BigInt(0b00001010100011111111111111111111));
		});
	});
});
