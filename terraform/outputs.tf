output "vm_public_ip" {
  value = azurerm_public_ip.pip.ip_address
}

output "load_balancer_public_ip" {
  value = azurerm_public_ip.pip.ip_address
}

output "grafana_url" {
  value = "http://${azurerm_public_ip.pip.ip_address}:3000"
}

output "prometheus_url" {
  value = "http://${azurerm_public_ip.pip.ip_address}:9090"
}
