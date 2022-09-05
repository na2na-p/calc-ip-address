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

struct IpInfo {
    ip: i32,
    subnet: i32,
    cidr: Option<i8>,
    network_address: i32,
    broadcast_address: i32,
    host_address: i32,
}

impl IpInfo {
    fn new(ip: String, cidr: Option<String>) {}
}
