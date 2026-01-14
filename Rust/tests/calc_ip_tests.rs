#[cfg(test)]
mod tests {
    use super::*;
    use crate::calc_ip::CalcIp;

    #[test]
    fn test_parse_ip() {
        let ip = "192.168.0.1";
        let parsed_ip = CalcIp::parse_ip(ip);
        assert_eq!(parsed_ip, 0xC0A80001);
    }

    #[test]
    fn test_parse_subnet() {
        let subnet = "255.255.255.0";
        let parsed_subnet = CalcIp::parse_subnet(subnet);
        assert_eq!(parsed_subnet, 0xFFFFFF00);
    }

    #[test]
    fn test_parse_subnet_from_cidr() {
        let cidr = 24;
        let parsed_subnet = CalcIp::parse_subnet_from_cidr(cidr);
        assert_eq!(parsed_subnet, 0xFFFFFF00);
    }

    #[test]
    fn test_add_to_dotted_decimal_notation() {
        let ip = 0xC0A80001;
        let dotted_decimal = CalcIp::add_to_dotted_decimal_notation(ip);
        assert_eq!(dotted_decimal, "192.168.0.1");
    }

    #[test]
    fn test_get_bin_ip_obj() {
        let ip = "192.168.0.1";
        let subnet = "255.255.255.0";
        let calc_ip = CalcIp::new(ip, Some(subnet));
        let bin_ip_obj = calc_ip.get_bin_ip_obj();
        assert_eq!(bin_ip_obj.0, 0xC0A80001);
        assert_eq!(bin_ip_obj.1, 0xFFFFFF00);
        assert_eq!(bin_ip_obj.2, 0xC0A80000);
        assert_eq!(bin_ip_obj.3, 0xC0A800FF);
        assert_eq!(bin_ip_obj.4, 0xFF);
        assert_eq!(bin_ip_obj.5, None);
    }

    #[test]
    fn test_ip_string() {
        let ip = "192.168.0.1";
        let subnet = "255.255.255.0";
        let calc_ip = CalcIp::new(ip, Some(subnet));
        assert_eq!(calc_ip.ip_string(), "192.168.0.1");
    }

    #[test]
    fn test_subnet_string() {
        let ip = "192.168.0.1";
        let subnet = "255.255.255.0";
        let calc_ip = CalcIp::new(ip, Some(subnet));
        assert_eq!(calc_ip.subnet_string(), "255.255.255.0");
    }

    #[test]
    fn test_network_address_string() {
        let ip = "192.168.0.1";
        let subnet = "255.255.255.0";
        let calc_ip = CalcIp::new(ip, Some(subnet));
        assert_eq!(calc_ip.network_address_string(), "192.168.0.0");
    }
}
