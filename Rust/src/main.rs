use clap::{App, Arg};
use regex::Regex;

mod calc_ip;
mod compare;
mod output;

use calc_ip::CalcIp;
use compare::Compare;
use output::Output;

fn main() {
    let matches = App::new("calc-ip-address")
        .version("1.0")
        .author("na2na")
        .about("Calculates IP addresses and subnets")
        .arg(
            Arg::with_name("server")
                .help("Server IP address in CIDR or IP/Subnet format")
                .required(true)
                .index(1),
        )
        .arg(
            Arg::with_name("client")
                .help("Client IP address in CIDR or IP/Subnet format")
                .required(true)
                .index(2),
        )
        .get_matches();

    let server_arg = matches.value_of("server").unwrap();
    let client_arg = matches.value_of("client").unwrap();

    let server_ip = parse_ip_arg(server_arg);
    let client_ip = parse_ip_arg(client_arg);

    let compare = Compare::new(server_ip, client_ip);
    Output::new(compare.result);
}

fn parse_ip_arg(arg: &str) -> CalcIp {
    let cidr_regex = Regex::new(r"^(\d{1,3}\.){3}\d{1,3}/\d{1,2}$").unwrap();
    let ip_subnet_regex = Regex::new(r"^(\d{1,3}\.){3}\d{1,3} (\d{1,3}\.){3}\d{1,3}$").unwrap();

    if cidr_regex.is_match(arg) {
        CalcIp::new(arg, None)
    } else if ip_subnet_regex.is_match(arg) {
        let parts: Vec<&str> = arg.split_whitespace().collect();
        CalcIp::new(parts[0], Some(parts[1]))
    } else {
        panic!("Invalid IP address format");
    }
}
