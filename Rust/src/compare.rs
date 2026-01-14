pub struct Compare {
    source: CalcIp,
    dist: CalcIp,
    result: ResultType,
}

impl Compare {
    pub fn new(source: CalcIp, dist: CalcIp) -> Self {
        let result = ResultType {
            source: SourceType {
                ip: source.ip_string(),
                subnet: source.subnet_string(),
                net_addr: source.network_address_string(),
                other_net_addr: CalcIp::add_to_dotted_decimal_notation(Self::calc_other_net_addr(&source, &dist)),
            },
            dist: DistType {
                ip: dist.ip_string(),
                subnet: dist.subnet_string(),
                net_addr: dist.network_address_string(),
                other_net_addr: CalcIp::add_to_dotted_decimal_notation(Self::calc_other_net_addr(&dist, &source)),
            },
            source_to_dist: Self::check_can_reach(&source, &dist),
            dist_to_source: Self::check_can_reach(&dist, &source),
        };

        Self { source, dist, result }
    }

    fn check_can_reach(my_host: &CalcIp, dist_host: &CalcIp) -> bool {
        if my_host.get_ip() == my_host.get_network_address() || my_host.get_ip() == my_host.get_broadcast_address() {
            return false;
        }

        if my_host.get_ip() == dist_host.get_ip() {
            return false;
        }

        if my_host.get_network_address() < dist_host.get_ip() && dist_host.get_ip() < my_host.get_broadcast_address() {
            return true;
        }

        false
    }

    fn calc_other_net_addr(my_host: &CalcIp, dist_host: &CalcIp) -> u32 {
        dist_host.get_ip() & my_host.get_subnet()
    }
}

pub struct ResultType {
    source: SourceType,
    dist: DistType,
    source_to_dist: bool,
    dist_to_source: bool,
}

pub struct SourceType {
    ip: String,
    subnet: String,
    net_addr: String,
    other_net_addr: String,
}

pub struct DistType {
    ip: String,
    subnet: String,
    net_addr: String,
    other_net_addr: String,
}
