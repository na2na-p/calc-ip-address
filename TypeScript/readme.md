# 実行環境

Node.js とパッケージマネージャとして pnpm が必要になります。  
devcontainer も準備してあるので Docker 使用可能ならそちらからどうぞ。

# ビルドと実行

```bash
cd TypeScript
pnpm install
pnpm build
---
pnpm start [IP(CIDR形式)] [IP(CIDR形式)]
あるいは
pnpm start [IP] [SUBNETMASK] [IP] [SUBNETMASK]
```

# テストコードもあります。

何してるかはむしろここ見たほうがいい気がしないでもないです。

```bash
cd TypeScript
pnpm build:test
pnpm test
```

# 備考

TypeScript(JavaScript)において、32 ビット整数に対してビット演算が適用され、結果が 32 ビット符号あり整数として再解釈されます。  
よって number 型だと非常に都合が悪いので bigint 型を使用しています。

# 参考: テスト結果

```
CalcIpクラスのテスト
	CIDR形式での入力
      ✔ IPを10進数に変換ができている
      ✔ IPアドレスを元の10進表記に戻せる
      ✔ サブネットマスクを10進数に変換ができている
      ✔ サブネットマスクを10進表記に戻せる
      ✔ マスクビットの取得ができる
      ✔ ネットワークアドレスの取得ができる
      ✔ ホストアドレス部の取得ができる
      ✔ ブロードキャストアドレスの取得ができる
    IPアドレス + サブネットマスク形式での入力
      ✔ IPを10進数に変換ができている
      ✔ IPアドレスを元の10進表記に戻せる
      ✔ サブネットマスクを10進数に変換ができている
      ✔ サブネットマスクを元の10進表記に戻せる
      ✔ ネットワークアドレスの取得ができる
      ✔ ネットワークアドレスを10進表記に戻せる
      ✔ ホストアドレス部の取得ができる
      ✔ ブロードキャストアドレスの取得ができる

Compareクラスのテスト
    正常系
      双方ともに疎通可能
        ✔ 疎通確認結果: source -> dist
        ✔ 疎通確認結果: dist -> source
      双方ともに疎通不可
        ✔ 疎通確認結果: source -> dist
        ✔ 疎通確認結果: dist -> source
      サーバからクライアントのみ通信可
        ✔ 疎通確認結果: source -> dist
        ✔ 疎通確認結果: dist -> source
    異常系
      どちらか片方のIPがネットワークアドレス
        ✔ 疎通確認結果: source -> dist
        ✔ 疎通確認結果: dist -> source
      どちらか片方のIPがブロードキャストアドレス
        ✔ 疎通確認結果: source -> dist
        ✔ 疎通確認結果: dist -> source
      どちらのIPも同一
        ✔ 疎通確認結果: source -> dist
        ✔ 疎通確認結果: dist -> source


  28 passing (43ms)
```
