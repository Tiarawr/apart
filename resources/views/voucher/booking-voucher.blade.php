<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Voucher Pemesanan - {{ $transaction->order_id }}</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            font-size: 11px;
            line-height: 1.4;
            color: #000000;
            background: #ffffff;
        }
        
        .voucher-container {
            max-width: 100%;
            margin: 0;
            padding: 30px;
            border: 2px solid #000000;
            background: #ffffff;
        }
        
        .header {
            text-align: center;
            margin-bottom: 30px;
            padding-bottom: 20px;
            border-bottom: 1px solid #000000;
        }
        
        .logo {
            font-size: 32px;
            font-weight: 700;
            color: #000000;
            margin-bottom: 5px;
            letter-spacing: 3px;
        }
        
        .title {
            font-size: 16px;
            font-weight: 600;
            color: #000000;
            margin-bottom: 10px;
            text-transform: uppercase;
            letter-spacing: 2px;
        }
        
        .order-id {
            font-size: 10px;
            color: #666666;
            font-family: 'Courier New', monospace;
        }
        
        .status-badge {
            background-color: #000000;
            color: #ffffff;
            padding: 8px 16px;
            font-size: 10px;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 1px;
            margin: 20px auto;
            text-align: center;
            display: inline-block;
            width: 100%;
        }
        
        .section {
            margin-bottom: 25px;
        }
        
        .section-title {
            font-size: 12px;
            font-weight: 600;
            color: #000000;
            margin-bottom: 12px;
            padding-bottom: 5px;
            border-bottom: 1px solid #000000;
            text-transform: uppercase;
            letter-spacing: 1px;
        }
        
        .info-table {
            width: 100%;
            border-collapse: collapse;
        }
        
        .info-row {
            border-bottom: 1px solid #f0f0f0;
        }
        
        .info-label {
            width: 40%;
            padding: 8px 0;
            font-weight: 500;
            color: #666666;
            font-size: 10px;
        }
        
        .info-value {
            width: 60%;
            padding: 8px 0;
            color: #000000;
            font-weight: 600;
            font-size: 10px;
            text-align: right;
        }
        
        .total-section {
            background-color: #f8f8f8;
            padding: 15px;
            margin-top: 15px;
            border: 1px solid #000000;
            text-align: center;
        }
        
        .total-label {
            font-size: 11px;
            font-weight: 600;
            color: #000000;
            text-transform: uppercase;
            letter-spacing: 1px;
            margin-bottom: 5px;
        }
        
        .total-value {
            font-size: 18px;
            font-weight: 700;
            color: #000000;
        }
        
        .qr-section {
            text-align: center;
            margin: 25px 0;
            padding: 20px;
            border: 1px solid #000000;
            background-color: #f8f8f8;
        }
        
        .qr-title {
            font-size: 11px;
            font-weight: 600;
            color: #000000;
            margin-bottom: 10px;
            text-transform: uppercase;
            letter-spacing: 1px;
        }
        
        .qr-code {
            font-family: 'Courier New', monospace;
            font-size: 14px;
            font-weight: 600;
            color: #000000;
            background-color: #ffffff;
            padding: 10px;
            border: 1px solid #000000;
            display: inline-block;
            margin-bottom: 8px;
        }
        
        .qr-instruction {
            font-size: 9px;
            color: #666666;
        }
        
        .footer {
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #000000;
            font-size: 9px;
            color: #666666;
        }
        
        .footer-title {
            font-weight: 600;
            color: #000000;
            margin-bottom: 8px;
            text-transform: uppercase;
            letter-spacing: 1px;
        }
        
        .footer-terms {
            line-height: 1.5;
            margin-bottom: 15px;
        }
        
        .footer-brand {
            text-align: center;
            font-weight: 600;
            color: #000000;
            font-size: 12px;
            letter-spacing: 2px;
        }
    </style>
</head>
<body>
    <div class="voucher-container">
        <!-- Header -->
        <div class="header">
            <div class="logo">LILO APART</div>
            <div class="title">Voucher Pemesanan</div>
            <div class="order-id">{{ $transaction->order_id }}</div>
        </div>
        
        <!-- Status -->
        @if($transaction->status === 'settlement' || $transaction->status === 'capture' || $transaction->status === 'paid')
        <div class="status-badge">
            ✓ VOUCHER VALID - PEMBAYARAN LUNAS
        </div>
        @endif
        
        <!-- Guest Information -->
        <div class="section">
            <div class="section-title">Informasi Tamu</div>
            <table class="info-table">
                <tr class="info-row">
                    <td class="info-label">Nama</td>
                    <td class="info-value">{{ $transaction->booking_data['guest_name'] ?? 'N/A' }}</td>
                </tr>
                <tr class="info-row">
                    <td class="info-label">Email</td>
                    <td class="info-value">{{ $transaction->customer_email }}</td>
                </tr>
                <tr class="info-row">
                    <td class="info-label">Telepon</td>
                    <td class="info-value">{{ $transaction->booking_data['guest_phone'] ?? 'N/A' }}</td>
                </tr>
                <tr class="info-row">
                    <td class="info-label">Jumlah Tamu</td>
                    <td class="info-value">{{ $transaction->booking_data['guests'] ?? 'N/A' }} orang</td>
                </tr>
            </table>
        </div>
        
        <!-- Apartment Information -->
        <div class="section">
            <div class="section-title">Detail Pemesanan</div>
            <table class="info-table">
                <tr class="info-row">
                    <td class="info-label">Apartemen</td>
                    <td class="info-value">{{ $transaction->apartment->name }}</td>
                </tr>
                <tr class="info-row">
                    <td class="info-label">Alamat</td>
                    <td class="info-value">{{ $transaction->apartment->address }}</td>
                </tr>
                <tr class="info-row">
                    <td class="info-label">Check-in</td>
                    <td class="info-value">{{ \Carbon\Carbon::parse($transaction->booking_data['check_in_date'])->format('d F Y') }}</td>
                </tr>
                <tr class="info-row">
                    <td class="info-label">Check-out</td>
                    <td class="info-value">{{ \Carbon\Carbon::parse($transaction->booking_data['check_out_date'])->format('d F Y') }}</td>
                </tr>
                <tr class="info-row">
                    <td class="info-label">Durasi</td>
                    <td class="info-value">{{ $transaction->booking_data['nights'] ?? 'N/A' }} malam</td>
                </tr>
            </table>
        </div>
        
        <!-- Payment Information -->
        <div class="section">
            <div class="section-title">Pembayaran</div>
            <table class="info-table">
                <tr class="info-row">
                    <td class="info-label">Status</td>
                    <td class="info-value">
                        @if($transaction->status === 'settlement' || $transaction->status === 'capture' || $transaction->status === 'paid')
                            LUNAS
                        @else
                            {{ strtoupper($transaction->status) }}
                        @endif
                    </td>
                </tr>
                <tr class="info-row">
                    <td class="info-label">Metode</td>
                    <td class="info-value">{{ strtoupper($transaction->payment_method ?? 'N/A') }}</td>
                </tr>
                <tr class="info-row">
                    <td class="info-label">Tanggal</td>
                    <td class="info-value">{{ $transaction->created_at->format('d F Y H:i') }}</td>
                </tr>
            </table>
            
            <!-- Total Amount -->
            <div class="total-section">
                <div class="total-label">Total Pembayaran</div>
                <div class="total-value">Rp {{ number_format($transaction->amount, 0, ',', '.') }}</div>
            </div>
        </div>
        
        <!-- QR Code / Voucher Code -->
        <div class="qr-section">
            <div class="qr-title">Kode Voucher</div>
            <div class="qr-code">{{ $transaction->order_id }}</div>
            <div class="qr-instruction">Tunjukkan kode ini saat check-in</div>
        </div>
        
        <!-- Footer / Terms -->
        <div class="footer">
            <div class="footer-title">Syarat dan Ketentuan</div>
            <div class="footer-terms">
                • Voucher ini valid sesuai tanggal check-in yang tertera<br>
                • Tunjukkan voucher ini beserta identitas diri saat check-in<br>
                • Check-in dimulai pukul 14:00, check-out maksimal pukul 12:00<br>
                • Untuk pertanyaan hubungi customer service kami
            </div>
            <div class="footer-brand">LILO APART</div>
        </div>
    </div>
</body>
</html>
