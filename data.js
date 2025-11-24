// Data transaksi
let transaksiData = {
  totalBarang: 0,
  totalPenjualan: 0
}; /*supaya bisa nyimpen jumlah barang yang terjual dan total uang hasil penjualan */

// Data produk
const produkData = [
  { nama: 'Paracetamol 500mg', harga: 5000 }, /*data nama dan harga barang yang dijual di apotiknya yaitu paracetamol  */
  { nama: 'Amoxicillin 500mg', harga: 25000 }, /*data nama dan harga barang yang dijual di apotiknya yaitu amoxicillin  */
  { nama: 'Vitamin C 1000mg', harga: 15000 }, /*data nama dan harga barang yang dijual di apotiknya yaitu vitamin c  */
  { nama: 'Antasida', harga: 8000 }, /*data nama dan harga barang yang dijual di apotiknya yaitu antasida  */
  { nama: 'Obat Batuk Herbal', harga: 12000 } /*data nama dan harga barang yang dijual di apotiknya yaitu obat batuk herbal  */
];

// ========================================
// FUNGSI NAVIGASI
// ========================================

function scrollToSection(sectionId) { /*biar bisa scroll ke section yang dituju*/
  // Tutup halaman kasir dan laporan jika sedang terbuka
  tutupKasir(); /*supaya waktu discrol bagian yg dituju keliatan jadi halaman yang kasir ini ditutup*/
  tutupLaporan(); /*supaya waktu discrol bagian yg dituju keliatan jadi halaman yang laporan ini ditutup*/
  
  // Scroll ke section yang dipilih
  const section = document.getElementById(sectionId); /* supaya bisa nyari bagian yang dituju agar bisa ke scroll ke bagian yang diinginkan */
  if (section) { /*untuk ngecek bagianna bisa ditemuin atau ga dan kalo udah nanti otomotis bakal ke scroll ke bagian yang dituju secara smooth */
    section.scrollIntoView({ behavior: 'smooth' }); /*biar waktu scroll itu mulus ga patah patah */
  }
  
  // Mencegah default behavior dari anchor link
  event.preventDefault();
}

// ========================================
// FUNGSI PROMO (Versi Apotek)
// ========================================

function tampilPromo() { /*fungsi supaya tombol lihat promo itu bisa muncul keterangan promo jika di click */
  alert(
    "🎉 PROMO SPESIAL APOTEK 🎉\n\n" +
    "Vitamin C 1000mg Diskon 20%!\n" +
    "Paracetamol Buy 2 Get 1!\n\n" +
    "Hubungi kami:\nWA: 0812-3456-7890"
  ); /*text promo apa yang tersedia dan ada kontak  */
}

// ========================================
// FUNGSI KASIR
// ========================================

function tampilkanKasir() { /* fungsinya agar saat kita click kasir nanti web nya otomatis bakal scroll ke bagian kasir */
  // Sembunyikan semua halaman terlebih dahulu
  document.querySelector('.main-content').style.display = 'none'; /* supaya halaman utamanya ga keliatan */
  document.getElementById('laporan-container').style.display = 'none';/* supaya halaman bagian laporan ga keliatan */
  
  // Tampilkan halaman kasir
  document.getElementById('kasir-container').style.display = 'block'; /* biar halaman kasir muncul karena pake perintah block, kalo none itu baru buat disembunyiin */
  
  // Scroll ke bagian atas kasir
  window.scrollTo({ /*supaya halamannya berubah ke bagian kasir */
    top: 0, /* supaya letaknya waktu di scroll itu langsung ke atas */
    behavior: 'smooth' /*biar waktu discroll buat menuju ke bagian yang dituju itu bisa mulus */
  });
}

function tutupKasir() { /*supaya bagian kasir ketutup */
  // Sembunyikan halaman kasir
  document.getElementById('kasir-container').style.display = 'none'; /*biar halaman kasir tuh disembunyiin */
  
  // Tampilkan konten utama
  document.querySelector('.main-content').style.display = 'block'; /* bikin halaman utama nya jadi balik keliatan lagi */
}

function pilihProduk(nama, harga) { /*fungsi biar kita nanti bisa pilih atau masukin nama dan harga */
  document.getElementById('barang').value = nama; /* agar nanti waktu di bagian barang kita bisa input nama produk yang mau dibeli */
  document.getElementById('harga').value = harga; /* agar nanti waktu di bagian harga kita bisa input harga produk yang mau dibeli */
  hitungTotal(); /*untuk ngitung harganya berapa dari jumlah barangnya */
}

function hitungTotal() { /*fungsi untuk menghitung total harganya berapa tergantung dengan quantity seta harga produknya berapa */
  let qty = parseFloat(document.getElementById("qty").value) || 0; /*untuk input jumlah barang yang mau dibeli dan 0 itu biar kalo g ada isinya dianggapnya 0 jadi masih bisa jalan sistemnya dan parsefloat itu agar hal yang di input berupa angka bukan text */
  let harga = parseFloat(document.getElementById("harga").value) || 0; /*untuk input harga barang yang mau dibeli dan 0 itu biar kalo g ada isinya dianggapnya 0 jadi masih bisa jalan sistemnya dan parsefloat itu agar hal yang di input berupa angka bukan text */
  let total = qty * harga; /*rumus ngitung total dengan jumlah barang dikalikan harga produknya */
  document.getElementById("hasil").innerText = "Rp " + total.toLocaleString(); /*untuk nunjukin total harganya dari hasil rumus diatas dengan bentuk Rp didepannya */
}

// Event listener untuk input qty dan harga
document.addEventListener('DOMContentLoaded', function() { /* supaya codingan nya bisa jalan dengan benar */
  document.getElementById('qty').addEventListener('input', hitungTotal); /* agar saat jumlah barang diubah total harga nya juga langsung berubah */
  document.getElementById('harga').addEventListener('input', hitungTotal); /* agar saat harga barang diubah total harga nya juga langsung berubah */
});

function prosesTransaksi() { /*fungsi bakal jalan kalo tombol proses di click */
  let nama = document.getElementById("nama").value; /*supaya nama itu bisa diambil sebagai input sebagai nama pelanggannya */
  let barang = document.getElementById("barang").value; /*supaya barang itu bisa diambil sebagai input sebagai barang yang dibeli */
  let qty = parseFloat(document.getElementById("qty").value) || 0; /*supaya barang itu bisa diambil sebagai input sebagai jumlah barang yang dibeli dalam bentuk angka dan hanya bisa bentuk angka dan kalo tidak isi dianggap nol */
  let harga = parseFloat(document.getElementById("harga").value) || 0; /*supaya barang itu bisa diambil sebagai input sebagai harga barang yang dibeli dalam bentuk angka dan hanya bisa bentuk angka dan kalo tidak isi dianggap nol */

  if (!nama || !barang || qty <= 0 || harga <= 0) { /*jika terjadi kondisi dimana nama, barang, qty, dan harga itu kosong atau ga valid */
    alert("⚠️ Data belum lengkap!\nHarap isi semua data dengan benar."); /*nanti akan muncul pemberitauan dengan text ini di webnya */
    return; /*supaya proses transaksi ga berlanjut karena setelah pencet ok kita bisa langsung lanjutin isi yang belum sesuai */
  }

  let total = qty * harga; /*ngitung harga total */
  
  // Update data transaksi
  transaksiData.totalBarang += qty; /*jumlah total barang yang sudah terjual itu bisa terus bertambah sesuai dengan transaksi yang ada */
  transaksiData.totalPenjualan += total; /*jumlah total penjualan yang sudah terjadi itu bisa terus bertambah sesuai dengan transaksi yang ada */
  
  // Update tampilan total
  document.getElementById("hasil").innerText = "Rp " + total.toLocaleString(); /*agar transaksi dari perintah diatas itu bisa muncul hasilnya dengan Rp didepannya */
  
  alert("✅ Transaksi berhasil diproses! Silakan cetak struk jika diperlukan."); /*pengumuman yang akan muncul jika kita berhasil melakukan transaksi dengan benar */
}

function resetForm() { /* fungsi yang buat isian kasirnya itu bisa di ulangin lagi */
  document.getElementById("nama").value = ""; /*agar nama nya jadi kosong lagi */
  document.getElementById("barang").value = ""; /*agar nama barang nya jadi kosong lagi */
  document.getElementById("qty").value = "";/*agar jumlah barang nya jadi kosong lagi */
  document.getElementById("harga").value = "";/*agar harganya jadi kosong lagi */
  document.getElementById("hasil").innerText = "Rp 0";/*agar hasil nya jadi kosong lagi */
}

// ========================================
// FUNGSI CETAK STRUK
// ========================================

function tampilkanStruk() { /*fungsi supaya struk bisa muncul */
  let nama = document.getElementById("nama").value; /*fungsi yang ngebuat supaya dibagian nama hasil inputnya itu nama pelanggan yang sudah diisi dibagian nama */
  let barang = document.getElementById("barang").value; /*fungsi yang ngebuat supaya dibagian nama barang hasil inputnya itu nama barang yang sudah diisi dibagian barang */
  let qty = document.getElementById("qty").value; /*fungsi yang ngebuat supaya dibagian jumlah barang inputnya itu jumlah barang yang sudah diisi dibagian qty */
  let harga = document.getElementById("harga").value; /*fungsi yang ngebuat harga barang inputnya itu harga produk yang sudah diisi dibagian harga */

  if (!nama || !barang || !qty || !harga) { /*jika nama barang qty dan harga tidak valid atau ada kesalahan */
    alert("⚠️ Data belum lengkap!\nHarap isi semua data sebelum mencetak struk."); /*akan muncul peringatan ini yang membuat struk belum bisa dicetak */
    return; /* mengembalikan tampilan kesemula */
  }

  let total = parseFloat(qty) * parseFloat(harga); /*rumus harga total dimana qty dikali harga dengan qty dan harga yang merupakan angka bukan text */

  // Isi data struk
  document.getElementById('struk-nama').innerText = nama; /*agar elemen nama bisa muncul di struk */
  document.getElementById('struk-barang').innerText = barang; /*agar elemen barang bisa muncul di struk */
  document.getElementById('struk-qty').innerText = qty; /*agar elemen qty bisa muncul di struk */
  document.getElementById('struk-harga').innerText = "Rp " + parseFloat(harga).toLocaleString(); /*agar elemen harga bisa muncul di struk dengan didahului dengan Rp lalu baru harga dalam bentuk angka dan terdapat format yang membuat angka berformat ribuan */
  document.getElementById('struk-total').innerText = "Rp " + total.toLocaleString(); /*agar elemen total harga bisa muncul di struk dengan didahului dengan Rp lalu baru harga dan terdapat format yang membuat angka berformat ribuan */

  // Tampilkan popup
  document.getElementById('popup-overlay').style.display = 'flex'; /*agar struk bisa muncul dan flex itu biar struk muncul dengan posisi ditengah layar */
}

function tutupPopupStruk() { /*fungsi untuk menutup struk belanja */
  document.getElementById('popup-overlay').style.display = 'none'; /* fungsi yang membuat struk kalo sudah diclick tutup itu langsung hilang karena ada none */
}

function cetakStruk() { /*berfungsi untuk mencetak struk */
  window.print(); /*kalo kita pencet cetak nanti kita beneran bisa download atau cetak struknya sungguhan */
}

// ========================================
// FUNGSI LAPORAN
// ========================================

function tampilkanLaporan() { /*fungsi untuk menampilkan laporang transaksi apotik */
  // Sembunyikan semua halaman terlebih dahulu
  document.querySelector('.main-content').style.display = 'none'; /*agar saat bagian laporan dipanggil halaman utama nya ilang karena ada none */
  document.getElementById('kasir-container').style.display = 'none'; /*agar saat bagian laporan dipanggil bagian kasir nya ilang karena ada none */
  
  // Update data laporan
  document.getElementById('totalBarang').innerText = transaksiData.totalBarang.toLocaleString(); /*nujukin jumlah total barang yang sudah dibeli selama transaksi dengan bentuk ribuan */
  document.getElementById('totalPenjualan').innerText = transaksiData.totalPenjualan.toLocaleString(); /*nujukin jumlah total penjualan yang sudah dilakukan selama transaksi dengan bentuk ribuan */
  
  // Tampilkan halaman laporan
  document.getElementById('laporan-container').style.display = 'block'; /*agar halaman laporang bisa muncul karena pake block bukan none */
  
  // Scroll ke bagian atas laporan
  window.scrollTo({ /*supaya halamannya berubah ke bagian atas laporan*/
    top: 0, /*biar lokasi laporan nya itu langsung pas diatas bagian websitenya */
    behavior: 'smooth' /*agar saat beralih ke laporan scrollnya itu bisa halus ga patah patah */
  });
}

function tutupLaporan() { /*berfungsi saat laporang mau ditutup */
  // Sembunyikan halaman laporan
  document.getElementById('laporan-container').style.display = 'none'; /*halaman bagian laporang ditutup */
  
  // Tampilkan konten utama
  document.querySelector('.main-content').style.display = 'block'; /**halaman ke scroll lagi ke bagian halaman utama karena halaman utama muncul kembali karena ada perintah block */
}

// ========================================
// FUNGSI NAVIGASI
// ========================================

function scrollToSection(sectionId) { /*agar websitanya bisa langsung ke scroll ke bagian yang kita inginkan */
  // Tutup halaman kasir dan laporan jika sedang terbuka
  tutupKasir(); /*untuk menutup bagian kasir */
  tutupLaporan(); /*untuk menutup bagian laporan */
  
  // Scroll ke section yang dipilih
  const section = document.getElementById(sectionId); /*agar bisa ke scroll ke bagian yang sudah kita click */
  if (section) { /*kondisi saat halman di scroll*/
    section.scrollIntoView({ behavior: 'smooth' }); /*saat halam terscroll menuju halaman yang diinginkan itu jalannya smooth atau mulus */
  }
  
  // Mencegah default behavior dari anchor link
  event.preventDefault();
}

// ========================================
// FUNGSI PROMO (Versi Apotek)
// ========================================

function tampilPromo() { /*untuk nampilin promo apa aja yang ada */
  alert(
    "🎉 PROMO SPESIAL APOTEK 🎉\n\n" +
    "Vitamin C 1000mg Diskon 20%!\n" +
    "Paracetamol Buy 2 Get 1!\n\n" +
    "Hubungi kami:\nWA: 0812-3456-7890"
  ); /*untuk nunjukin promonya itu apa aja kalo diclick dan ada contact personnya*/
}

// ========================================
// INISIALISASI
// ========================================

window.onload = function () {
  // Tidak perlu menampilkan halaman tertentu karena sudah menggunakan scroll
};
