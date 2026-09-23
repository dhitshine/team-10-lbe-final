# NCC LBE 2026 Final Project

## Dokumentasi

Berikut adalah dokumentasi untuk menjalankan website ini secara local dengan menggunakan docker dan azure. Applikasi yang akan dijalankan adalah website portofolio yang dijalankan secara lokal di vm masing-masing.

### Persiapan Dockerfile

> Pertama-tama persiapkan `Dockerfile` yang akan membungkus proyek website di direktori utama `portofolio-ncc`, isinya sebagai berikut.
```
FROM nginx:alpine

RUN rm -f /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/nginx.conf

COPY src/ /usr/share/nginx/html/

COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

EXPOSE 8080

ENTRYPOINT ["/entrypoint.sh"]
```

> Buat `entrypoint.sh` di direktori yang sama
```
#!/bin/sh
set -e

# VM_HOSTNAME is expected to be passed in at "docker run" time, e.g.:
#   docker run -d -e VM_HOSTNAME=$(whoami) -p 8080:8080 breakout-lb-demo
#
# We sanitize it down to only what a Linux whoami can legally contain
# (letters, digits, hyphen) before writing it into a JS file. This avoids
# any chance of breaking the generated script or injecting something
# unexpected into the page.
SAFE_HOSTNAME=$(printf '%s' "${VM_HOSTNAME:-unknown}" | tr -cd 'A-Za-z0-9-')

if [ -z "$SAFE_HOSTNAME" ]; then
  SAFE_HOSTNAME="unknown"
fi

cat > /usr/share/nginx/html/config.js <<EOF
window.APP_CONFIG = { hostname: "${SAFE_HOSTNAME}" };
EOF

echo "Starting Portofolio, whoami injected as: ${SAFE_HOSTNAME}"

exec nginx -g "daemon off;"
```

>Buat juga `nginx.conf` seperti pada modul
```
worker_processes auto;

events {
    worker_connections 1024;
}

http {
    include       /etc/nginx/mime.types;
    default_type  application/octet-stream;
    sendfile      on;

    server {
        listen 8080;
        server_name _;

        root /usr/share/nginx/html;
        index index.html;

        location / {
            try_files $uri $uri/ =404;
        }
    }
}
```

> Build docker image
```
docker build -t <nama-image> .
```

>   Setelah itu, proyek siap di-run di perangkat local masing-masing dengan command berikut
```
sudo docker run --name <nama-web> -p 8080:8080 -d -e VM_HOSTNAME=$(whoami) <nama-image>
```

> Cek apakah docker sudah berhasil

> Bungkus image docker dengan format `.tar`
```
docker save <nama-image> -o <nama-file.tar>
```


### Persiapan Virtual Machine

> Buat vm terlebih dahulu pada resource group yang sama di Azure seperti yang diajarkan pada modul.

> Untuk team10, login ke vm masing masing harus didahului dengan terhubung ke vm-radhit dengan command `sudo ssh -i ~/Downloads/lbe_team10 radhit@70.153.148.165`.

> Setelah itu, baru bisa masuk ke vm masing masing yaitu dengan memasukkan `ssh <nama>@<private ip>` beserta password saya.

> Memastikan docker terinstal dan berjalan.
```
docker --version
sudo systemctl status docker
```

> Pindahkan image berformat `.tar` ke `vm-radhit` terlebih dahulu
```
scp -i lbe_team10 <nama-file.tar> radhit@70.153.148.165
```

> Pindahkan lagi ke vm masing-masing di dalam resource group dengan username dan ip address masing-masing vm.
```
scp <nama-file> <username>@<private-ip>:~/
```
**eksekusi command ini di vm-radhit**

> Kembali ke vm masing-masing, lalu coba load docker image tadi.
```
docker load -i <nama-file.tar>
```

> Cek `docker image ls` untuk mengetahui apakah proses load berhasil.

> Jalankan websitenya dengan command berikut
```
docker run -d --name <nama-file> -p 8080:8080 -e VM_HOSTNAME=$(whoami) <nama-image>:latest
```

> Tes hasilnya dengan localhost sesuai port yang digunakan
```
curl -s http://localhost:8080/
```

### Akses Load Balancer

Aplikasi portofolio ini dapat diakses secara publik melalui Azure Load Balancer. 

**Load Balancer Public IP:** `70.153.107.214`

> *Catatan: Akses IP tersebut di browser menggunakan port 8080.*
