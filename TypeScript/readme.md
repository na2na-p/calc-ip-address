# 実行環境

Node.js とパッケージマネージャとして yarn が必要になります。  
devcontainer も準備してあるので Docker 使用可能ならそちらからどうぞ。

# ビルドと実行

```bash
cd TypeScript
yarn install
yarn build
---
yarn start [IP(CIDR形式)] [IP(CIDR形式)]
あるいは
yarn start [IP] [SUBNETMASK] [IP] [SUBNETMASK]
```

# テストコードもあります。

何してるかはむしろここ見たほうがいい気がしないでもないです。

```bash
cd TypeScript
yarn build:test
yarn test
```

# 備考

TypeScript(JavaScript)において、32 ビット整数に対してビット演算が適用され、結果が 32 ビット符号あり整数として再解釈されます。  
よって number 型だと非常に都合が悪いので bigint 型を使用しています。
