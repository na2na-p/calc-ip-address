fn main() {
    // println!("Hello, world!");
    // 引数を配列に格納する
    let args = std::env::args().collect::<Vec<_>>();

    // 引数を表示する
    println!("args: {:?}", args);
    println!("args: {:?}", args[1]);
    println!("args: {:?}", args[2]);

    if args.len() < 2 || args.len() > 4 {
        panic!("正しい表示形式ではありません。CIDR形式と他の形式を混在させることはできません。");
    }
}
