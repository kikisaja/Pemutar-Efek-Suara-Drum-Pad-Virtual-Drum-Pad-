# 🥁 Virtual Drum Pad (Web Audio Synthesizer)

Aplikasi **Pemutar Efek Suara Drum Pad Interaktif** berbasis web yang memungkinkan pengguna memainkan instrumen drum digital menggunakan papan ketik (*keyboard*) maupun ketukan tombol pada layar (*click/touch*).

Proyek ini dirancang tanpa ketergantungan file audio external (tanpa file `.mp3` atau `.wav`). Seluruh gelombang audio drum diproduksi secara real-time melalui **Web Audio API**.

---

## 🎯 Target Belajar & Konsep RPL

1. **Web Audio API (`AudioContext`):**
   Memahami pembuatan sinyal suara dinamis menggunakan `OscillatorNode`, `GainNode`, `BiquadFilterNode`, dan penciptaan *white noise* melalui `AudioBuffer`.
2. **Keyboard Event Handling:**
   Mendeteksi tombol keyboard pengguna (`keydown`) dan memetakan tombol huruf (A, S, D, F, G, H, J, K) ke aksi pemutaran audio yang presisi.
3. **Data Attribute Mapping:**
   Menggunakan atribut HTML5 `data-key` dan `data-sound` untuk menghubungkan struktur HTML dengan logika skrip JS secara bersih.
4. **CSS State Transitions:**
   Memberikan umpan balik visual (*visual feedback*) yang instan saat tombol ditekan via animasi kelas `.active`.

---

## 📂 Struktur Folder Proyek

```text
├── index.html       # Struktur grid tombol drum pad dan display informasi
├── style.css        # Desain layout Neobrutalism responsif dan gaya tombol aktif
└── script.js        # Engine Web Audio API synthesizer dan listener tombol keyboard/klik
