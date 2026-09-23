# Evidence checklist

Evidence tersedia sebagian: `curl-loop.txt` memuat respons dari empat hostname (`ben`, `rafli`, `dewa`, `radhit`), tetapi timestamp dan command asal tidak tercatat. Screenshot backend pool semua healthy belum tersedia; status health terkini perlu dikonfirmasi di Azure Portal.

## Artefak evidence

- `curl-loop.txt`: output hostname yang ditemukan di repository; provenance waktu dan command tidak diketahui.
- `curl-loop-output.txt`: salinan output dengan catatan keterbatasan provenance.
- `healthy-backend-pool.png`: screenshot Azure Portal yang menunjukkan semua VM pada backend pool healthy; belum tersedia.
- `failure-simulation.png`: hanya jika failure simulation benar-benar dicoba. Jangan membuat placeholder atau mengklaim file ini ada sebelum screenshot asli tersedia.

## Checklist verifikasi lanjutan

- [ ] Pastikan container aplikasi yang sesuai berjalan pada `vm-radhit`, `vm-rafli`, dan `vm-dewa`, dengan `VM_HOSTNAME` masing-masing; source Ben belum tersedia.
- [ ] Pastikan NSG menerima TCP port `8080` pada setiap VM.
- [ ] Pastikan health probe `/` pada port `8080` menandai semua backend healthy.
- [ ] Ambil screenshot Azure Portal backend pool sebagai `healthy-backend-pool.png`.
- [ ] Jalankan curl loop dari mesin di luar Load Balancer dan catat timestamp serta command:

  ```sh
  for i in $(seq 1 30); do printf '%02d ' "$i"; curl -sS --http1.1 --no-keepalive --connect-timeout 5 --max-time 10 http://70.153.107.214/config.js; echo; done
  ```

- [ ] Simpan output asli yang memperlihatkan lebih dari satu hostname.
- [ ] Jika `/config.js` tidak terlihat, cek container menerima `VM_HOSTNAME` dan Nginx menyajikan file generated tersebut. Jangan mengganti output dengan asumsi.

Browser refresh saja bukan bukti distribusi karena Azure Standard Load Balancer memakai five-tuple hash.
