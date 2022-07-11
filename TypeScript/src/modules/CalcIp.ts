import {ipObj, ipBin} from '@/types/types.js';
/**
 * 引数として渡されたIPアドレスのネットワークアドレスを計算するクラス。
 * @class CalcIp
 */
export class CalcIp {
	ip: ipBin;
	subnet: ipBin;
	cidr: number | undefined;
	networkAddress: ipBin;
	broadcastAddress: ipBin;
	hostAddress: ipBin;

	constructor(ip: string, subnet?: string) {
		if (subnet == undefined) {
			const subnetCidr = ip.split('/')[1];
			this.subnet = this.parseSubnetFromCidr(subnetCidr);
			this.cidr = parseInt(subnetCidr);
			const ipStr = ip.split('/')[0];
			this.ip = this.parseIp(ipStr);
		} else {
			// サブネットマスクを取得する。
			// サブネットマスクを、2進数に変換して、32ケタの2進数のうち、subnetの文字数分だけ1で埋めて、残りは0で埋める。
			this.subnet = this.parseSubnet(subnet);
			this.ip = this.parseIp(ip);
		}
		
		// ネットワークアドレスを計算する。
		this.networkAddress = this.ip & this.subnet;

		// ホストアドレス部の取り出し
		this.hostAddress = this.subnet ^ 4294967295n;

		// ブロードキャストアドレス
		this.broadcastAddress = this.networkAddress | this.hostAddress;
	}

	/**
     * サブネットマスクを都合のいい形の文字列で返すメソッド。
     * @param subnet サブネットマスク(3ケタ区切りのアレ) 例: "255.255.255.0"
     * @return {string} サブネットマスクを表す2進数の文字列 例: "11111111111111111111111111110000"
     */
	private parseSubnet(subnet: string): bigint {
		// 実はparseIp()と一緒
		return this.parseIp(subnet);
	}

	/**
     * CIDR形式のあの末尾の数字からサブネットマスクを求めるメソッド
     * @param cidr CIDR形式のあの末尾の数字 例: "24"
     * @return {bigint} サブネットマスクを表す10進数の文字列
     */
	private parseSubnetFromCidr(cidr: string): bigint {
		// -1をビットシフトして、サブネットマスクを求める。
		const subnet = BigInt(Math.pow(2, 32) - 1) >> BigInt(32 - parseInt(cidr));
		return subnet ^ 4294967295n;
	}

	/**
     * IPアドレスを二進数の形式の文字列で返すメソッド。
     * @param ip IPアドレスを表す文字列 例: "192.168.0.1"
     * @return {bigint} IPアドレスを表す10進数
     */
	private parseIp(ip: string): bigint {
		const dividedIp = ip.split('.').reverse();
		const byte = 8;
	
		return BigInt(dividedIp.reduce((accumulator, v, idx) => {
			const binary = (parseInt(v, 10) << (byte * idx)) >>> 0;
			return accumulator + binary;
		}, 0));
	}

	/**
     * thisで持ってるprivate変数オウム返し(テスト用)
     * @return {ipObj}
     */
	public getBinIpObj(): ipObj {
		return {
			ip: this.ip,
			subnet: this.subnet,
			networkAddress: this.networkAddress,
			broadcastAddress: this.broadcastAddress,
			hostAddress: this.hostAddress,
			cidr: this.cidr,
		};
	}
}
