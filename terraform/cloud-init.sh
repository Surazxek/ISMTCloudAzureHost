#!/bin/bash
set -e

apt-get update -y
apt-get install -y apt-transport-https ca-certificates curl software-properties-common

curl -fsSL https://download.docker.com/linux/ubuntu/gpg | gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] \
  https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | \
  tee /etc/apt/sources.list.d/docker.list > /dev/null

apt-get update -y
apt-get install -y docker-ce docker-compose-plugin

mkdir -p /opt/stack
cd /opt/stack

cat <<'COMPOSE' > docker-compose.yml
version: "3.8"
services:
  mongodb:
    image: mongo:6
    restart: unless-stopped
    ports:
      - "27017:27017"
  nginx:
    image: nginx:stable
    restart: unless-stopped
    ports:
      - "80:80"
    volumes:
      - ./nginx_conf:/etc/nginx/conf.d
  node_exporter:
    image: prom/node-exporter:latest
    restart: unless-stopped
    ports:
      - "9100:9100"
  prometheus:
    image: prom/prometheus:latest
    restart: unless-stopped
    ports:
      - "9090:9090"
    volumes:
      - ./prometheus.yml:/etc/prometheus/prometheus.yml:ro
  grafana:
    image: grafana/grafana-oss:latest
    restart: unless-stopped
    ports:
      - "3000:3000"
    environment:
      - GF_SECURITY_ADMIN_PASSWORD=admin
volumes:
  mongodata:
COMPOSE

cat <<'PROM' > prometheus.yml
global:
  scrape_interval: 15s
scrape_configs:
  - job_name: 'prometheus'
    static_configs:
      - targets: ['localhost:9090']
  - job_name: 'node'
    static_configs:
      - targets: ['localhost:9100']
PROM

mkdir -p nginx_conf
cat <<'NGINX' > nginx_conf/default.conf
server {
  listen 80;
  location / {
    return 200 'Hello from Azure demo nginx app\n';
    add_header Content-Type text/plain;
  }
}
NGINX

/usr/bin/docker compose up -d
