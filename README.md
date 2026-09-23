# Laporan LBE: Azure VM + Azure Load Balancer

## Ringkasan

Project ini menyajikan portfolio berbasis HTML, CSS, dan JavaScript yang dilayani Nginx di dalam Docker. Build context aplikasi tersedia untuk Radhit, Rafli, dan Dewa. Source Ben belum tersedia di repository. File evidence curl yang ada memuat hostname `radhit`, `rafli`, `ben`, dan `dewa`; command asal dan waktu pengambilan tidak tercatat, jadi ini bukan bukti health backend saat ini.

Repository public: <https://github.com/dhitshine/team-10-lbe-final>

## Arsitektur deployment

- Resource group: `rg-ncc`
- VNet: `vnet-team10`
- Subnet: tepat `1`; nama subnet belum diketahui
- Load Balancer: `lb-team10`
- Public IP Load Balancer: `70.153.107.214` (verifikasi ulang sebelum submission jika resource sudah tidak live)
- Frontend: HTTP port `80`
- Backend/app: TCP port `8080`
- Health probe: port `8080`, path `/`
- Session persistence: `None`
- NSG: TCP port `8080` diizinkan pada empat VM

Topologi aktual memakai empat VM, sedangkan `REQUIREMENT.md` menuliskan 2–3 VM. Laporan ini mengikuti kondisi aktual dan tidak menyebut jumlah tersebut fully compliant terhadap requirement tertulis.

| VM | Peran | Private IP | Source/image | Status evidence |
| --- | --- | --- | --- | --- |
| `vm-radhit` | master/public entry point | `10.0.0.4` | `app/radhit/`, `web-radhit:latest` | Container aktif dan healthy dilaporkan; hostname ada pada curl evidence |
| `vm-rafli` | backend private | `10.0.0.5` | `app/rafli/`; tag image deployment belum dikonfirmasi | Hostname ada pada curl evidence; health portal belum dikonfirmasi |
| `vm-dewa` | backend private | `10.0.0.6` | `app/dewa/`; tag image deployment belum dikonfirmasi | Hostname ada pada curl evidence; health portal belum dikonfirmasi |
| `vm-ben` | backend private | `10.0.0.7` | Source belum tersedia | Hostname ada pada curl evidence; health portal belum dikonfirmasi |

File `docs/evidence/curl-loop.txt` memuat output empat hostname berbeda, jadi ada bukti respons lintas-backend dari waktu pengambilan yang tidak tercatat. File tersebut tidak mencatat command atau timestamp dan tidak membuktikan status backend saat ini. Screenshot Azure backend pool semua healthy belum tersedia.

## Struktur repository

```text

README.md
app/
├── radhit/ (Dockerfile, entrypoint.sh, nginx.conf, src/)
├── rafli/ (Dockerfile, entrypoint.sh, nginx.conf, app/)
└── dewa/ (Dockerfile, entrypoint.sh, nginx.conf, app/)
docs/
├── architecture.md
└── evidence/
    ├── README.md
    ├── curl-loop-output.txt
    └── curl-loop.txt
```

Setiap folder aplikasi adalah build context mandiri. Source Ben belum tersedia; tidak dibuat source portfolio fiktif.

## Build dan run aplikasi Radhit

Jalankan dari root repository:

```sh
docker build -t web-radhit:latest ./app/radhit
docker run -d --name web-radhit \
  -e VM_HOSTNAME="$(hostname)" \
  -p 8080:8080 \
  web-radhit:latest
```

`Dockerfile` memakai `nginx:alpine`, menyalin static files ke `/usr/share/nginx/html`, dan mengekspos port `8080`. `entrypoint.sh` membaca `VM_HOSTNAME`, menyaring karakter yang aman, lalu membuat `/config.js` dengan `window.APP_CONFIG.hostname`. File ini dipakai untuk identifikasi backend pada curl evidence; source portfolio saat ini belum menampilkan `APP_CONFIG` pada halaman.

Perintah build/run Rafli dan Dewa belum dicantumkan karena tag image yang benar-benar digunakan saat deployment belum dikonfirmasi. Folder source Ben juga belum tersedia. Tidak ada command deployment fiktif.

## Verifikasi

Verifikasi lokal dengan prefix HTTP:

```sh
curl -i http://localhost:8080/
curl -i http://localhost:8080/config.js
```

Verifikasi Load Balancer dengan prefix HTTP:

```sh
curl -i http://70.153.107.214/
```

Untuk mengumpulkan evidence distribusi baru menggunakan fresh connection:

```sh
for i in $(seq 1 30); do printf '%02d ' "$i"; curl -sS --http1.1 --no-keepalive --connect-timeout 5 --max-time 10 http://70.153.107.214/config.js; echo; done
```

Azure Standard Load Balancer memilih backend memakai five-tuple hash. Browser refresh sering memakai koneksi atau source port yang sama, jadi tidak cukup untuk membuktikan distribusi. Jika `/config.js` tidak terlihat, pastikan container menerima `VM_HOSTNAME` dan Nginx menyajikan file generated tersebut.

## Evidence dan stretch goal

Lihat [`docs/evidence/README.md`](docs/evidence/README.md) untuk status serta checklist. Output yang tersedia berada di `docs/evidence/curl-loop.txt` dan salinannya di `docs/evidence/curl-loop-output.txt`; provenance timestamp dan command tidak tersedia. Screenshot backend pool semua healthy belum tersedia.

Stretch goal yang dicoba: tidak ada. Tidak ada claim GitHub Actions, HTTPS, failure simulation, atau load testing.

## Catatan submission

- Repository harus tetap public dan dapat dibuka tanpa login di URL di atas.
- Sebelum submission, verifikasi ulang public IP, backend pool, probe, NSG, dan status health di Azure Portal.
- Jika portal menampilkan fakta berbeda, perbarui laporan berdasarkan portal; jangan mempertahankan nilai tebakan.
