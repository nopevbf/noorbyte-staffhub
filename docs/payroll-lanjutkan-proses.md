# Fitur Payroll: Lanjutkan Proses

## Tujuan

Halaman `Lanjutkan Proses` digunakan untuk melanjutkan alur proses payroll pada tahap sinkronisasi data, menampilkan progres, anomali data, ringkasan sinkronisasi, dan aksi lanjut ke tahap validasi.

## Input

- Route: `/payroll/process/continue`
- Sumber akses:
  1. Tombol `Lanjutkan Proses` di halaman dashboard payroll (`/payroll/process`)

## Output

- Tampilan stepper proses payroll (5 tahap)
- Status sinkronisasi data dan persentase progres
- Ringkasan metrik sinkronisasi (log kehadiran, jam lembur, hari izin)
- Panel anomali data dan info sinkronisasi terakhir
- Aksi footer: `Batalkan Proses` dan `Berikutnya: Validasi`

## Cara Pakai

1. Buka menu **Payroll**.
2. Klik **Proses**.
3. Klik tombol **Lanjutkan Proses**.
4. Lakukan review data sinkronisasi sebelum melanjutkan ke tahap validasi.
