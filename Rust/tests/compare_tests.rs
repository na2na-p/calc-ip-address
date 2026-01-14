#[cfg(test)]
mod tests {
    use super::*;
    use crate::calc_ip::CalcIp;
    use crate::compare::Compare;

    #[test]
    fn test_check_can_reach() {
        let source_ip = CalcIp::new("192.168.1.1/24", None);
        let dist_ip = CalcIp::new("192.168.1.2/24", None);
        let compare = Compare::new(source_ip, dist_ip);
        assert!(compare.result.source_to_dist);
        assert!(compare.result.dist_to_source);
    }

    #[test]
    fn test_calc_other_net_addr() {
        let source_ip = CalcIp::new("192.168.1.1/24", None);
        let dist_ip = CalcIp::new("192.168.2.1/24", None);
        let compare = Compare::new(source_ip, dist_ip);
        assert_eq!(compare.result.source.other_net_addr, "192.168.1.0");
        assert_eq!(compare.result.dist.other_net_addr, "192.168.2.0");
    }

    #[test]
    fn test_check_can_reach_with_broadcast_address() {
        let source_ip = CalcIp::new("192.168.1.255/24", None);
        let dist_ip = CalcIp::new("192.168.1.1/24", None);
        let compare = Compare::new(source_ip, dist_ip);
        assert!(!compare.result.source_to_dist);
        assert!(compare.result.dist_to_source);
    }

    #[test]
    fn test_check_can_reach_with_network_address() {
        let source_ip = CalcIp::new("192.168.1.0/24", None);
        let dist_ip = CalcIp::new("192.168.1.1/24", None);
        let compare = Compare::new(source_ip, dist_ip);
        assert!(!compare.result.source_to_dist);
        assert!(compare.result.dist_to_source);
    }

    #[test]
    fn test_check_can_reach_with_same_ip() {
        let source_ip = CalcIp::new("192.168.1.1/24", None);
        let dist_ip = CalcIp::new("192.168.1.1/24", None);
        let compare = Compare::new(source_ip, dist_ip);
        assert!(!compare.result.source_to_dist);
        assert!(!compare.result.dist_to_source);
    }
}
