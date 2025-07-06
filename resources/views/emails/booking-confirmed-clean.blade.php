<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Konfirmasi Pemesanan - Lilo Apart</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.6;
            color: #333;
            background-color: #f8f9fa;
        }
        
        .email-container {
            max-width: 600px;
            margin: 40px auto;
            background-color: #ffffff;
            border: 1px solid #e1e5e9;
        }
        
        .header {
            background-color: #000000;
            color: #ffffff;
            padding: 40px 30px;
            text-align: center;
            border-bottom: 1px solid #e1e5e9;
        }
        
        .header h1 {
            font-size: 24px;
            font-weight: 600;
            letter-spacing: 1px;
            margin-bottom: 8px;
        }
        
        .header p {
            font-size: 14px;
            opacity: 0.9;
            font-weight: 300;
        }
        
        .content {
            padding: 40px 30px;
        }
        
        .greeting {
            margin-bottom: 30px;
        }
        
        .greeting h2 {
            font-size: 18px;
            color: #000000;
            margin-bottom: 8px;
            font-weight: 500;
        }
        
        .greeting p {
            color: #666666;
            font-size: 14px;
        }
        
        .booking-details {
            background-color: #fafafa;
            border: 1px solid #e1e5e9;
            padding: 25px;
            margin: 30px 0;
        }
        
        .section-title {
            font-size: 16px;
            font-weight: 600;
            color: #000000;
            margin-bottom: 20px;
            padding-bottom: 8px;
            border-bottom: 2px solid #000000;
        }
        
        .detail-grid {
            display: table;
            width: 100%;
            border-collapse: collapse;
        }
        
        .detail-row {
            display: table-row;
        }
        
        .detail-label,
        .detail-value {
            display: table-cell;
            padding: 8px 0;
            border-bottom: 1px solid #f0f0f0;
            font-size: 14px;
        }
        
        .detail-label {
            width: 40%;
            font-weight: 500;
            color: #333333;
        }
        
        .detail-value {
            color: #666666;
            text-align: right;
        }
        
        .order-id {
            background-color: #000000;
            color: #ffffff;
            padding: 15px;
            text-align: center;
            margin: 30px 0;
            font-family: 'Courier New', monospace;
            letter-spacing: 1px;
        }
        
        .order-id-label {
            font-size: 12px;
            opacity: 0.8;
            margin-bottom: 5px;
        }
        
        .order-id-value {
            font-size: 16px;
            font-weight: bold;
        }
        
        .total-amount {
            background-color: #f8f9fa;
            border: 2px solid #000000;
            padding: 20px;
            text-align: center;
            margin: 30px 0;
        }
        
        .total-label {
            font-size: 14px;
            color: #666666;
            margin-bottom: 5px;
        }
        
        .total-value {
            font-size: 24px;
            font-weight: bold;
            color: #000000;
        }
        
        .instructions {
            background-color: #f8f9fa;
            border-left: 4px solid #000000;
            padding: 20px;
            margin: 30px 0;
        }
        
        .instructions h3 {
            font-size: 16px;
            color: #000000;
            margin-bottom: 15px;
            font-weight: 600;
        }
        
        .instructions ul {
            list-style: none;
            padding: 0;
        }
        
        .instructions li {
            padding: 5px 0;
            color: #666666;
            font-size: 14px;
            position: relative;
            padding-left: 20px;
        }
        
        .instructions li:before {
            content: "•";
            color: #000000;
            font-weight: bold;
            position: absolute;
            left: 0;
        }
        
        .footer {
            background-color: #fafafa;
            padding: 30px;
            text-align: center;
            border-top: 1px solid #e1e5e9;
            color: #666666;
        }
        
        .footer h3 {
            color: #000000;
            font-size: 16px;
            margin-bottom: 15px;
            font-weight: 600;
        }
        
        .footer p {
            font-size: 13px;
            margin-bottom: 8px;
        }
        
        .contact-info {
            margin-top: 20px;
            padding-top: 20px;
            border-top: 1px solid #e1e5e9;
        }
        
        @media (max-width: 600px) {
            .email-container {
                margin: 0;
                border: none;
            }
            
            .content,
            .header,
            .footer {
                padding: 20px;
            }
            
            .booking-details {
                margin: 20px 0;
                padding: 20px;
            }
        }
    </style>
</head>
<body>
    <div class="email-container">
        <!-- Header -->
        <div class="header">
            <h1>LILO APART</h1>
            <p>Konfirmasi Pemesanan</p>
        </div>
        
        <!-- Content -->
        <div class="content">
            <!-- Greeting -->
            <div class="greeting">
                <h2>Halo {{ $transaction->booking_data['guest_name'] ?? 'Customer' }}</h2>
                <p>Terima kasih atas pemesanan Anda. Pembayaran telah berhasil diproses.</p>
            </div>
            
            <!-- Order ID -->
            <div class="order-id">
                <div class="order-id-label">ORDER ID</div>
                <div class="order-id-value">{{ $transaction->order_id }}</div>
            </div>
            
            <!-- Booking Details -->
            <div class="booking-details">
                <div class="section-title">Detail Pemesanan</div>
                <div class="detail-grid">
                    <div class="detail-row">
                        <div class="detail-label">Apartemen</div>
                        <div class="detail-value">{{ $transaction->apartment->name ?? 'N/A' }}</div>
                    </div>
                    <div class="detail-row">
                        <div class="detail-label">Check-in</div>
                        <div class="detail-value">{{ $transaction->booking_data['check_in_date'] ? \Carbon\Carbon::parse($transaction->booking_data['check_in_date'])->format('d F Y') : 'N/A' }}</div>
                    </div>
                    <div class="detail-row">
                        <div class="detail-label">Check-out</div>
                        <div class="detail-value">{{ $transaction->booking_data['check_out_date'] ? \Carbon\Carbon::parse($transaction->booking_data['check_out_date'])->format('d F Y') : 'N/A' }}</div>
                    </div>
                    <div class="detail-row">
                        <div class="detail-label">Durasi</div>
                        <div class="detail-value">{{ $transaction->booking_data['duration'] ?? 'N/A' }} malam</div>
                    </div>
                    <div class="detail-row">
                        <div class="detail-label">Jumlah Tamu</div>
                        <div class="detail-value">{{ $transaction->booking_data['guests'] ?? 'N/A' }} orang</div>
                    </div>
                    <div class="detail-row">
                        <div class="detail-label">Email</div>
                        <div class="detail-value">{{ $transaction->customer_email }}</div>
                    </div>
                    <div class="detail-row">
                        <div class="detail-label">Telepon</div>
                        <div class="detail-value">{{ $transaction->booking_data['guest_phone'] ?? 'N/A' }}</div>
                    </div>
                </div>
            </div>
            
            <!-- Total Amount -->
            <div class="total-amount">
                <div class="total-label">Total Pembayaran</div>
                <div class="total-value">Rp {{ number_format($transaction->amount, 0, ',', '.') }}</div>
            </div>
            
            <!-- Instructions -->
            <div class="instructions">
                <h3>Instruksi Check-in</h3>
                <ul>
                    <li>Tunjukkan voucher ini beserta identitas diri saat check-in</li>
                    <li>Check-in mulai pukul 14:00, check-out maksimal pukul 12:00</li>
                    <li>Voucher terlampir dalam format PDF untuk dicetak</li>
                    <li>Hubungi kami jika ada pertanyaan atau perubahan</li>
                </ul>
            </div>
        </div>
        
        <!-- Footer -->
        <div class="footer">
            <h3>LILO APART</h3>
            <p>Email: info@liloapart.site</p>
            <p>Website: www.liloapart.site</p>
            
            <div class="contact-info">
                <p>Terima kasih telah memilih layanan kami.</p>
                <p>Kami berkomitmen memberikan pengalaman terbaik untuk Anda.</p>
            </div>
        </div>
    </div>
</body>
</html>
