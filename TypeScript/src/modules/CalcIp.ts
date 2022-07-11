import {ipObj, ipBin} from '@/types/types.js';
/**
 * 引数として渡されたIPアドレスのネットワークアドレスを計算するクラス。
 * @class CalcIp
 */
export class CalcIp {
	ip: number;
	subnet: number;
	cidr: number;
	networkAddress: number;
	broadcastAddress: number;
	hostAddress: number;

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
			this.cidr = this.getCidr();
			this.ip = this.parseIp(ip);
		}
		
		// ネットワークアドレスを計算する。
		this.networkAddress = this.ip & this.subnet;

		// ホストアドレス部の取り出し
		this.hostAddress = this.subnet ^ 4294967295;

		// ブロードキャストアドレス
		this.broadcastAddress = this.networkAddress | this.hostAddress;
	}

	/**
     * サブネットマスクを都合のいい形の文字列で返すメソッド。
     * @param subnet サブネットマスク(3ケタ区切りのアレ) 例: "255.255.255.0"
     * @return {string} サブネットマスクを表す2進数の文字列 例: "11111111111111111111111111110000"
     */
	private parseSubnet(subnet: string): number {
		// 255.255.255.0を11111111111111111111111111110000に変換する
		// 実はparseIp()と一緒
		return this.parseIp(subnet);
	}

	/**
     * @return {number} CIDR形式のアレ
     */
	private getCidr(): number {
		const subnet = this.subnet.toString(2);
		let cidr = 0;
		for (let i = 0; i < subnet.length; i++) {
			if (subnet[i] == '1') {
				cidr++;
			}
		}

		return cidr;
	}

	/**
     * CIDR形式のあの末尾の数字からサブネットマスクを求めるメソッド
     * @param cidr CIDR形式のあの末尾の数字 例: "24"
     * @return {string} サブネットマスクを表す2進数の文字列 例: "11111111111111111111111111110000"
     */
	private parseSubnetFromCidr(cidr: string): number {
		return parseInt(('1'.repeat(parseInt(cidr)) + '0'.repeat(32 - parseInt(cidr))).slice(0, 32), 2);
	}

	/**
     * IPアドレスを二進数の形式の文字列で返すメソッド。
     * @param ip IPアドレスを表す文字列 例: "192.168.0.1"
     * @return {number} IPアドレスを表す10進数
     */
	private parseIp(ip: string): number {
		const dividedIp = ip.split('.').reverse();
		const byte = 8;
	
		return dividedIp.reduce((accumulator, v, idx) => {
			const binary = (parseInt(v, 10) << (byte * idx)) >>> 0;
			return accumulator + binary;
		}, 0);
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
