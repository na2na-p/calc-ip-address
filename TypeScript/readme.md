# 実行環境
Node.jsとパッケージマネージャとしてyarnが必要になります。

# ビルドと実行
```bash
cd TypeScript
yarn install
yarn build
yarn start
```

# テストコードもあります。
何してるかはむしろここ見たほうがいい気がしないでもないです。
```bash
cd TypeScript
yarn test
```

# 備考
TypeScript(JavaScript)において、32ビット整数に対してビット演算が適用され、結果が32ビット符号あり整数として再解釈されます。  
よってnumber型だと非常に都合が悪いのでbigint型を使用しています。
