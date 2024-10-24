#[cfg(test)]
mod tests {
    use super::*;
    use crate::output::Output;
    use crate::compare::{Compare, ResultType, SourceType, DistType};
    use crate::calc_ip::CalcIp;

    #[test]
    fn test_output_new() {
        let source_ip = CalcIp::new("192.168.1.1/24", None);
        let dist_ip = CalcIp::new("192.168.1.2/24", None);
        let compare = Compare::new(source_ip, dist_ip);
        let result = compare.result;

        Output::new(result);
    }

    #[test]
    fn test_output_new_with_different_subnets() {
        let source_ip = CalcIp::new("192.168.1.1/24", None);
        let dist_ip = CalcIp::new("192.168.2.1/24", None);
        let compare = Compare::new(source_ip, dist_ip);
        let result = compare.result;

        Output::new(result);
    }

    #[test]
    fn test_output_new_with_broadcast_address() {
        let source_ip = CalcIp::new("192.168.1.255/24", None);
        let dist_ip = CalcIp::new("192.168.1.1/24", None);
        let compare = Compare::new(source_ip, dist_ip);
        let result = compare.result;

        Output::new(result);
    }

    #[test]
    fn test_output_new_with_network_address() {
        let source_ip = CalcIp::new("192.168.1.0/24", None);
        let dist_ip = CalcIp::new("192.168.1.1/24", None);
        let compare = Compare::new(source_ip, dist_ip);
        let result = compare.result;

        Output::new(result);
    }

    #[test]
    fn test_output_new_with_same_ip() {
        let source_ip = CalcIp::new("192.168.1.1/24", None);
        let dist_ip = CalcIp::new("192.168.1.1/24", None);
        let compare = Compare::new(source_ip, dist_ip);
        let result = compare.result;

        Output::new(result);
    }
}
