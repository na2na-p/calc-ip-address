use std::process::Command;

#[test]
fn test_main_integration() {
    let output = Command::new("cargo")
        .arg("run")
        .arg("--")
        .arg("192.168.1.1/24")
        .arg("192.168.1.2/24")
        .output()
        .expect("Failed to execute command");

    let stdout = String::from_utf8_lossy(&output.stdout);
    let stderr = String::from_utf8_lossy(&output.stderr);

    assert!(stderr.is_empty(), "stderr is not empty: {}", stderr);
    assert!(stdout.contains("サーバ:\t\t192.168.1.1\t255.255.255.0"));
    assert!(stdout.contains("クライアント:\t192.168.1.2\t255.255.255.0"));
    assert!(stdout.contains("サーバ視点\t\tサーバNetAddr\t\t\x1b[32m192.168.1.0\x1b[0m"));
    assert!(stdout.contains("サーバ視点\t\tクライアントNetAddr\t\x1b[32m192.168.1.0\x1b[0m"));
    assert!(stdout.contains("サーバ視点\t\tクラアントへ到達が可能\t\x1b[32mはい\x1b[0m"));
    assert!(stdout.contains("クライアント視点\tサーバNetAddr\t\t\x1b[32m192.168.1.0\x1b[0m"));
    assert!(stdout.contains("クライアント視点\tクライアントNetAddr\t\x1b[32m192.168.1.0\x1b[0m"));
    assert!(stdout.contains("クライアント視点\tサーバへ到達が可能\t\x1b[32mはい\x1b[0m"));
}
