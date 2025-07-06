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
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            line-height: 1.6;
            color: #000000;
            background-color: #ffffff;
        }
        
        .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            border: 1px solid #e5e5e5;
        }
        
        .header {
            background-color: #000000;
            color: #ffffff;
            padding: 40px 30px;
            text-align: center;
        }
        
        .logo {
            font-size: 32px;
            font-weight: 700;
            letter-spacing: 2px;
            margin-bottom: 8px;
        }
        
        .header-subtitle {
            font-size: 14px;
            opacity: 0.8;
            font-weight: 300;
            letter-spacing: 1px;
        }
        
        .content {
            padding: 40px 30px;
        }
        
        .greeting {
            font-size: 16px;
            margin-bottom: 30px;
            color: #000000;
        }
        
        .status-badge {
            display: inline-block;
            background-color: #000000;
            color: #ffffff;
            padding: 8px 16px;
            font-size: 12px;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 1px;
            margin-bottom: 30px;
        }
        
        .section {
            margin-bottom: 40px;
        }
        
        .section-title {
            font-size: 14px;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 1px;
            margin-bottom: 20px;
            color: #000000;
            border-bottom: 1px solid #000000;
            padding-bottom: 8px;
        }
        
        .detail-row {
            display: flex;
            justify-content: space-between;
            padding: 12px 0;
            border-bottom: 1px solid #f0f0f0;
        }
        
        .detail-row:last-child {
            border-bottom: none;
        }
        
        .detail-label {
            font-size: 14px;
            color: #666666;
            font-weight: 400;
        }
        
        .detail-value {
            font-size: 14px;
            color: #000000;
            font-weight: 500;
            text-align: right;
        }
        
        .total-section {
            background-color: #f8f8f8;
            padding: 20px;
            margin-top: 20px;
            border: 1px solid #e5e5e5;
        }
        
        .total-label {
            font-size: 16px;
            font-weight: 600;
            color: #000000;
            text-transform: uppercase;
            letter-spacing: 1px;
        }
        
        .total-amount {
            font-size: 24px;
            font-weight: 700;
            color: #000000;
            margin-top: 8px;
        }
        
        .order-id {
            background-color: #f8f8f8;
            padding: 15px;
            margin: 20px 0;
            border: 1px solid #e5e5e5;
            text-align: center;
        }
        
        .order-id-label {
            font-size: 12px;
            color: #666666;
            margin-bottom: 5px;
            text-transform: uppercase;
            letter-spacing: 1px;
        }
        
        .order-id-value {
            font-family: 'Courier New', monospace;
            font-size: 16px;
            font-weight: 600;
            color: #000000;
        }
        
        .footer {
            background-color: #f8f8f8;
            padding: 30px;
            text-align: center;
            border-top: 1px solid #e5e5e5;
        }
        
        .footer-text {
            font-size: 12px;
            color: #666666;
            line-height: 1.5;
            margin-bottom: 10px;
        }
        
        .footer-brand {
            font-size: 14px;
            font-weight: 600;
            color: #000000;
            margin-top: 15px;
            letter-spacing: 1px;
        }
        
        .divider {
            height: 1px;
            background-color: #e5e5e5;
            margin: 30px 0;
        }
        
        @media (max-width: 600px) {
            .container {
                margin: 0;
            }
            
            .content, .header, .footer {
                padding: 20px;
            }
            
            .detail-row {
                flex-direction: column;
                gap: 5px;
            }
            
            .detail-value {
                text-align: left;
                font-weight: 600;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <!-- Header -->
        <div class="header">
            <div class="logo">LILO APART</div>
            <div class="header-subtitle">Premium Apartment Booking</div>
        </div>
        
        <!-- Content -->
        <div class="content">
            <!-- Greeting -->
            <div class="greeting">
                Halo <strong>{{ $transaction->booking_data['guest_name'] ?? 'Customer' }}</strong>,
            </div>
            
            <!-- Status -->
            <div class="status-badge">
                ✓ Pembayaran Berhasil
            </div>
            
            <!-- Order ID -->
            <div class="order-id">
                <div class="order-id-label">Order ID</div>
                <div class="order-id-value">{{ $transaction->order_id }}</div>
            </div>
            
            <p style="margin-bottom: 30px; color: #666666; font-size: 14px;">
                Terima kasih atas pembayaran Anda. Pemesanan apartemen Anda telah dikonfirmasi.
                PDF voucher terlampir dalam email ini.
            </p>
            
            <!-- Booking Details -->
            <div class="section">
                <div class="section-title">Detail Pemesanan</div>
                <div class="detail-row">
                    <span class="detail-label">Apartemen</span>
                    <span class="detail-value">{{ $transaction->apartment->name ?? 'N/A' }}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Check-in</span>
                    <span class="detail-value">{{ $transaction->booking_data['check_in_date'] ? \Carbon\Carbon::parse($transaction->booking_data['check_in_date'])->format('d F Y') : 'N/A' }}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Check-out</span>
                    <span class="detail-value">{{ $transaction->booking_data['check_out_date'] ? \Carbon\Carbon::parse($transaction->booking_data['check_out_date'])->format('d F Y') : 'N/A' }}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Durasi</span>
                    <span class="detail-value">{{ $transaction->booking_data['nights'] ?? 'N/A' }} malam</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Jumlah Tamu</span>
                    <span class="detail-value">{{ $transaction->booking_data['guests'] ?? 'N/A' }} orang</span>
                </div>
            </div>
            
            <!-- Guest Information -->
            <div class="section">
                <div class="section-title">Informasi Tamu</div>
                <div class="detail-row">
                    <span class="detail-label">Nama</span>
                    <span class="detail-value">{{ $transaction->booking_data['guest_name'] ?? 'N/A' }}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Email</span>
                    <span class="detail-value">{{ $transaction->customer_email ?? 'N/A' }}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Telepon</span>
                    <span class="detail-value">{{ $transaction->booking_data['guest_phone'] ?? 'N/A' }}</span>
                </div>
            </div>
            
            <!-- Payment Information -->
            <div class="section">
                <div class="section-title">Pembayaran</div>
                <div class="detail-row">
                    <span class="detail-label">Metode</span>
                    <span class="detail-value">{{ strtoupper($transaction->payment_method ?? 'N/A') }}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Status</span>
                    <span class="detail-value">Lunas</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Tanggal</span>
                    <span class="detail-value">{{ $transaction->created_at->format('d F Y H:i') }}</span>
                </div>
                
                <!-- Total Amount -->
                <div class="total-section">
                    <div class="total-label">Total Pembayaran</div>
                    <div class="total-amount">Rp {{ number_format($transaction->amount, 0, ',', '.') }}</div>
                </div>
            </div>
            
            <div class="divider"></div>
            
            <!-- Instructions -->
            <div style="font-size: 14px; color: #666666; line-height: 1.6;">
                <p style="margin-bottom: 15px;"><strong>Petunjuk Check-in:</strong></p>
                <p style="margin-bottom: 10px;">• Tunjukkan email konfirmasi ini saat check-in</p>
                <p style="margin-bottom: 10px;">• Check-in dimulai pukul 14:00</p>
                <p style="margin-bottom: 10px;">• Check-out maksimal pukul 12:00</p>
                <p style="margin-bottom: 15px;">• Bawa identitas diri yang valid</p>
                
                <p style="margin-bottom: 10px;">Jika ada pertanyaan, hubungi customer service kami.</p>
            </div>
        </div>
        
        <!-- Footer -->
        <div class="footer">
            <div class="footer-text">
                Email ini dikirim otomatis. Mohon jangan membalas email ini.
            </div>
            <div class="footer-text">
                Untuk pertanyaan, hubungi info@liloapart.site
            </div>
            <div class="footer-brand">LILO APART</div>
        </div>
    </div>
</body>
</html>
