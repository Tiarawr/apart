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
            font-family: 'DejaVu Sans', Arial, sans-serif;
            font-size: 12px;
            line-height: 1.4;
            color: #000;
            background: white;
            padding: 20px;
        }
        
        .voucher-container {
            max-width: 100%;
            border: 3px solid #000;
            padding: 30px;
            background: white;
        }
        
        .header {
            text-align: center;
            margin-bottom: 30px;
            padding-bottom: 20px;
            border-bottom: 2px solid #000;
        }
        
        .logo {
            font-size: 32px;
            font-weight: bold;
            color: #000;
            margin-bottom: 5px;
            letter-spacing: 3px;
        }
        
        .title {
            font-size: 18px;
            font-weight: bold;
            color: #000;
            margin-bottom: 10px;
        }
        
        .order-id {
            font-size: 14px;
            color: #000;
            background: #f5f5f5;
            padding: 8px 15px;
            border: 1px solid #000;
            display: inline-block;
            font-family: 'Courier New', monospace;
            letter-spacing: 1px;
        }
        
        .content {
            display: table;
            width: 100%;
        }
        
        .left-column,
        .right-column {
            display: table-cell;
            width: 50%;
            vertical-align: top;
            padding: 0 15px;
        }
        
        .section {
            margin-bottom: 25px;
        }
        
        .section-title {
            font-size: 16px;
            font-weight: bold;
            color: #000;
            margin-bottom: 15px;
            padding-bottom: 5px;
            border-bottom: 2px solid #000;
        }
        
        .info-table {
            width: 100%;
            border-collapse: collapse;
        }
        
        .info-row {
            border-bottom: 1px solid #ddd;
        }
        
        .info-label {
            padding: 8px 0;
            font-weight: bold;
            color: #000;
            width: 40%;
        }
        
        .info-value {
            padding: 8px 0;
            color: #333;
            text-align: right;
        }
        
        .total-section {
            background: #f9f9f9;
            border: 2px solid #000;
            padding: 20px;
            text-align: center;
            margin: 20px 0;
        }
        
        .total-label {
            font-size: 14px;
            color: #000;
            margin-bottom: 5px;
        }
        
        .total-value {
            font-size: 24px;
            font-weight: bold;
            color: #000;
        }
        
        .footer {
            margin-top: 30px;
            padding-top: 20px;
            border-top: 2px solid #000;
            text-align: center;
        }
        
        .footer-title {
            font-size: 14px;
            font-weight: bold;
            margin-bottom: 15px;
            color: #000;
        }
        
        .footer-text {
            font-size: 11px;
            color: #333;
            margin-bottom: 5px;
        }
        
        .qr-section {
            text-align: center;
            margin: 20px 0;
            padding: 15px;
            border: 1px solid #000;
            background: #f9f9f9;
        }
        
        .qr-title {
            font-size: 12px;
            font-weight: bold;
            margin-bottom: 10px;
            color: #000;
        }
        
        .qr-code {
            font-family: 'Courier New', monospace;
            font-size: 16px;
            font-weight: bold;
            color: #000;
            border: 1px solid #000;
            padding: 10px 15px;
            background: white;
            display: inline-block;
            letter-spacing: 1px;
        }
        
        .qr-instruction {
            font-size: 10px;
            color: #666;
            margin-top: 8px;
        }
    </style>
</head>
<body>
    <div class="voucher-container">
        <!-- Header -->
        <div class="header">
            <div class="logo">LILO APART</div>
            <div class="title">VOUCHER PEMESANAN</div>
            <div class="order-id">{{ $transaction->order_id }}</div>
        </div>
        
        <!-- Content -->
        <div class="content">
            <!-- Left Column -->
            <div class="left-column">
                <!-- Customer Information -->
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
                            <td class="info-label">Tamu</td>
                            <td class="info-value">{{ $transaction->booking_data['guests'] ?? 'N/A' }} orang</td>
                        </tr>
                    </table>
                </div>
                
                <!-- Apartment Information -->
                <div class="section">
                    <div class="section-title">Informasi Apartemen</div>
                    <table class="info-table">
                        <tr class="info-row">
                            <td class="info-label">Nama</td>
                            <td class="info-value">{{ $transaction->apartment->name ?? 'N/A' }}</td>
                        </tr>
                        <tr class="info-row">
                            <td class="info-label">Alamat</td>
                            <td class="info-value">{{ $transaction->apartment->address ?? 'N/A' }}</td>
                        </tr>
                    </table>
                </div>
            </div>
            
            <!-- Right Column -->
            <div class="right-column">
                <!-- Booking Information -->
                <div class="section">
                    <div class="section-title">Detail Pemesanan</div>
                    <table class="info-table">
                        <tr class="info-row">
                            <td class="info-label">Check-in</td>
                            <td class="info-value">{{ $transaction->booking_data['check_in_date'] ? \Carbon\Carbon::parse($transaction->booking_data['check_in_date'])->format('d M Y') : 'N/A' }}</td>
                        </tr>
                        <tr class="info-row">
                            <td class="info-label">Check-out</td>
                            <td class="info-value">{{ $transaction->booking_data['check_out_date'] ? \Carbon\Carbon::parse($transaction->booking_data['check_out_date'])->format('d M Y') : 'N/A' }}</td>
                        </tr>
                        <tr class="info-row">
                            <td class="info-label">Durasi</td>
                            <td class="info-value">{{ $transaction->booking_data['duration'] ?? 'N/A' }} malam</td>
                        </tr>
                        <tr class="info-row">
                            <td class="info-label">Status</td>
                            <td class="info-value">
                                @if($transaction->status === 'settlement' || $transaction->status === 'capture')
                                    LUNAS
                                @else
                                    {{ strtoupper($transaction->status) }}
                                @endif
                            </td>
                        </tr>
                    </table>
                </div>
                
                <!-- QR Code Section -->
                <div class="qr-section">
                    <div class="qr-title">KODE VOUCHER</div>
                    <div class="qr-code">{{ $transaction->order_id }}</div>
                    <div class="qr-instruction">Tunjukkan kode ini saat check-in</div>
                </div>
            </div>
        </div>
        
        <!-- Total Amount -->
        <div class="total-section">
            <div class="total-label">TOTAL PEMBAYARAN</div>
            <div class="total-value">Rp {{ number_format($transaction->amount, 0, ',', '.') }}</div>
        </div>
        
        <!-- Footer -->
        <div class="footer">
            <div class="footer-title">SYARAT DAN KETENTUAN</div>
            <div class="footer-text">Check-in mulai pukul 14:00 - Check-out maksimal pukul 12:00</div>
            <div class="footer-text">Tunjukkan voucher ini beserta identitas diri saat check-in</div>
            <div class="footer-text">Untuk pertanyaan hubungi: info@liloapart.site</div>
            <div class="footer-text" style="margin-top: 15px; font-weight: bold;">Terima kasih telah memilih LILO APART</div>
        </div>
    </div>
</body>
</html>
