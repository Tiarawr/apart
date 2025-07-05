# Payment Method Configuration

## Sistem Payment yang Benar

### QRIS (QR Code Indonesian Standard)
- **Tujuan**: Menampilkan QR Code universal yang bisa discan oleh semua aplikasi e-wallet
- **Konfigurasi**: `enabled_payments: ['qris']`
- **Hasil**: User akan melihat QR Code yang bisa discan dengan GoPay, ShopeePay, DANA, OVO, LinkAja, dll
- **UI**: Tidak perlu memilih provider, langsung tampil QR Code

### E-Wallet (Redirect ke Aplikasi Spesifik)
- **Tujuan**: Redirect langsung ke aplikasi e-wallet tertentu
- **Konfigurasi**: `enabled_payments: ['gopay']` atau `['shopeepay']` dll
- **Hasil**: User akan diarahkan ke aplikasi/simulator e-wallet yang dipilih
- **UI**: Harus memilih provider terlebih dahulu (GoPay, ShopeePay, DANA, OVO, LinkAja)

## Masalah yang Sudah Diperbaiki

### ✅ QRIS
- Sekarang hanya menampilkan QR Code
- Tidak menampilkan pilihan payment method lain
- enabled_payments: ['qris']

### ✅ E-Wallet
- Sekarang redirect ke aplikasi spesifik
- GoPay -> aplikasi GoPay/simulator
- ShopeePay -> aplikasi ShopeePay/simulator
- enabled_payments: ['gopay'] atau ['shopeepay'] dll

## Konfigurasi Terkini

### Backend (MidtransService.php)
```php
// QRIS - hanya QR Code
case 'qris':
    return ['qris'];

// E-Wallet - redirect ke app spesifik
case 'ewallet':
    return $this->getEwalletPayments($provider);
```

### Frontend (Booking.jsx)
```jsx
// QRIS - tidak ada provider selection
{
    id: "qris",
    name: "QRIS",
    description: "Scan QR Code dengan aplikasi e-wallet apapun"
}

// E-Wallet - ada provider selection
{
    id: "ewallet",
    name: "E-Wallet",
    description: "Redirect langsung ke aplikasi pilihan Anda",
    providers: [...]
}
```

## Testing
1. **QRIS**: Pilih QRIS -> Langsung muncul QR Code
2. **GoPay**: Pilih E-Wallet -> Pilih GoPay -> Redirect ke GoPay
3. **ShopeePay**: Pilih E-Wallet -> Pilih ShopeePay -> Redirect ke ShopeePay
