pub struct CalcIp {
    ip: u32,
    subnet: u32,
    cidr: Option<u8>,
    network_address: u32,
    broadcast_address: u32,
    host_address: u32,
}

impl CalcIp {
    pub fn new(ip: &str, subnet: Option<&str>) -> Self {
        let (ip, subnet, cidr) = if let Some(subnet) = subnet {
            (Self::parse_ip(ip), Self::parse_subnet(subnet), None)
        } else {
            let parts: Vec<&str> = ip.split('/').collect();
            let ip = Self::parse_ip(parts[0]);
            let cidr = parts[1].parse::<u8>().unwrap();
            let subnet = Self::parse_subnet_from_cidr(cidr);
            (ip, subnet, Some(cidr))
        };

        let network_address = ip & subnet;
        let host_address = !subnet;
        let broadcast_address = network_address | host_address;

        Self {
            ip,
            subnet,
            cidr,
            network_address,
            broadcast_address,
            host_address,
        }
    }

    pub fn ip_string(&self) -> String {
        Self::add_to_dotted_decimal_notation(self.ip)
    }

    pub fn subnet_string(&self) -> String {
        Self::add_to_dotted_decimal_notation(self.subnet)
    }

    pub fn network_address_string(&self) -> String {
        Self::add_to_dotted_decimal_notation(self.network_address)
    }

    pub fn get_ip(&self) -> u32 {
        self.ip
    }

    pub fn get_subnet(&self) -> u32 {
        self.subnet
    }

    pub fn get_cidr(&self) -> Option<u8> {
        self.cidr
    }

    pub fn get_network_address(&self) -> u32 {
        self.network_address
    }

    pub fn get_broadcast_address(&self) -> u32 {
        self.broadcast_address
    }

    pub fn get_host_address(&self) -> u32 {
        self.host_address
    }

    fn parse_ip(ip: &str) -> u32 {
        ip.split('.')
            .map(|octet| octet.parse::<u32>().unwrap())
            .enumerate()
            .fold(0, |acc, (i, octet)| acc + (octet << (8 * (3 - i))))
    }

    fn parse_subnet(subnet: &str) -> u32 {
        Self::parse_ip(subnet)
    }

    fn parse_subnet_from_cidr(cidr: u8) -> u32 {
        (!0u32) << (32 - cidr)
    }

    fn add_to_dotted_decimal_notation(ip: u32) -> String {
        format!(
            "{}.{}.{}.{}",
            (ip >> 24) & 0xFF,
            (ip >> 16) & 0xFF,
            (ip >> 8) & 0xFF,
            ip & 0xFF
        )
    }

    pub fn get_bin_ip_obj(&self) -> (u32, u32, u32, u32, u32, Option<u8>) {
        (
            self.ip,
            self.subnet,
            self.network_address,
            self.broadcast_address,
            self.host_address,
            self.cidr,
        )
    }
}
