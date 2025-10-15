variable "prefix" {
  description = "Prefix for all resources"
  default     = "tf3tier"
}

variable "location" {
  description = "Azure region"
  default     = "centralindia"
}

variable "vm_size" {
  default     = "Standard_B2s"
  description = "VM size"
}

variable "admin_username" {
  default = "azureuser"
}

variable "admin_password" {
  description = "Admin password for VM (or use SSH key)"
  default     = "ChangeThis123!"
  sensitive   = true
}
