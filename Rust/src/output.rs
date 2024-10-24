pub struct Output;

impl Output {
    pub fn new(result: ResultType) {
        println!("サーバ:\t\t{}\t{}", result.source.ip, result.source.subnet);
        println!("クライアント:\t{}\t{}", result.dist.ip, result.dist.subnet);

        println!(
            "サーバ視点\t\tサーバNetAddr\t\t{}",
            if result.source_to_dist {
                format!("\x1b[32m{}\x1b[0m", result.source.net_addr)
            } else {
                format!("\x1b[31m{}\x1b[0m", result.source.net_addr)
            }
        );

        println!(
            "サーバ視点\t\tクライアントNetAddr\t{}",
            if result.source_to_dist {
                format!("\x1b[32m{}\x1b[0m", result.source.other_net_addr)
            } else {
                format!("\x1b[31m{}\x1b[0m", result.source.other_net_addr)
            }
        );

        println!(
            "サーバ視点\t\tクラアントへ到達が可能\t{}",
            if result.source_to_dist {
                "\x1b[32mはい\x1b[0m"
            } else {
                "\x1b[31mいいえ\x1b[0m"
            }
        );

        println!(
            "クライアント視点\tサーバNetAddr\t\t{}",
            if result.dist_to_source {
                format!("\x1b[32m{}\x1b[0m", result.dist.other_net_addr)
            } else {
                format!("\x1b[31m{}\x1b[0m", result.dist.other_net_addr)
            }
        );

        println!(
            "クライアント視点\tクライアントNetAddr\t{}",
            if result.dist_to_source {
                format!("\x1b[32m{}\x1b[0m", result.dist.net_addr)
            } else {
                format!("\x1b[31m{}\x1b[0m", result.dist.net_addr)
            }
        );

        println!(
            "クライアント視点\tサーバへ到達が可能\t{}",
            if result.dist_to_source {
                "\x1b[32mはい\x1b[0m"
            } else {
                "\x1b[31mいいえ\x1b[0m"
            }
        );
    }
}
