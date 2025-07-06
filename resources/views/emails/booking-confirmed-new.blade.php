<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Konfirmasi Pembayaran - Lilo Apart</title>
    <style>
        body {
            margin: 0;
            padding: 0;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            background-color: #f8f9fa;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 30px;
            text-align: center;
        }
        .header h1 {
            margin: 0;
            font-size: 28px;
            font-weight: bold;
        }
        .header p {
            margin: 10px 0 0 0;
            opacity: 0.9;
            font-size: 16px;
        }
        .content {
            padding: 30px;
        }
        .success-badge {
            background-color: #d4edda;
            color: #155724;
            padding: 15px;
            border-radius: 8px;
            text-align: center;
            margin-bottom: 25px;
            border: 1px solid #c3e6cb;
        }
        .success-badge strong {
            font-size: 18px;
        }
        .booking-details {
            background-color: #f8f9fa;
            border-radius: 8px;
            padding: 20px;
            margin: 20px 0;
        }
        .detail-row {
            display: flex;
            justify-content: space-between;
            margin-bottom: 12px;
            padding-bottom: 8px;
            border-bottom: 1px solid #e9ecef;
        }
        .detail-row:last-child {
            border-bottom: none;
            margin-bottom: 0;
        }
        .detail-label {
            font-weight: 600;
            color: #495057;
        }
        .detail-value {
            color: #212529;
            text-align: right;
        }
        .total-amount {
            background-color: #e8f5e8;
            padding: 15px;
            border-radius: 8px;
            text-align: center;
            margin: 20px 0;
            border: 2px solid #28a745;
        }
        .total-amount .amount {
            font-size: 24px;
            font-weight: bold;
            color: #28a745;
        }
        .voucher-section {
            background-color: #fff3cd;
            border: 2px dashed #ffc107;
            border-radius: 8px;
            padding: 20px;
            text-align: center;
            margin: 25px 0;
        }
        .voucher-code {
            font-family: 'Courier New', monospace;
            font-size: 20px;
            font-weight: bold;
            background-color: white;
            padding: 10px 15px;
            border-radius: 5px;
            display: inline-block;
            margin: 10px 0;
            border: 1px solid #ffc107;
        }
        .instructions {
            background-color: #e7f3ff;
            padding: 20px;
            border-radius: 8px;
            margin: 20px 0;
        }
        .instructions h3 {
            margin-top: 0;
            color: #0056b3;
        }
        .instructions ul {
            margin: 10px 0;
            padding-left: 20px;
        }
        .instructions li {
            margin-bottom: 8px;
        }
        .footer {
            background-color: #f8f9fa;
            padding: 25px;
            text-align: center;
            border-top: 1px solid #e9ecef;
        }
        .footer p {
            margin: 5px 0;
            color: #6c757d;
        }
        .contact-info {
            margin-top: 15px;
            font-size: 14px;
        }
        @media (max-width: 600px) {
            .container {
                margin: 10px;
            }
            .header, .content, .footer {
                padding: 20px;
            }
            .detail-row {
                flex-direction: column;
            }
            .detail-value {
                text-align: left;
                margin-top: 5px;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <!-- Header -->
        <div class="header">
            <h1>🏨 LILO APART</h1>
            <p>Konfirmasi Pembayaran Berhasil</p>
        </div>

        <!-- Content -->
        <div class="content">
            <!-- Success Message -->
            <div class="success-badge">
                <strong>✅ PEMBAYARAN BERHASIL!</strong><br>
                Terima kasih, pembayaran Anda telah berhasil diproses.
            </div>

            <!-- Greeting -->
            <p>Halo <strong>{{ $transaction->booking_data['guest_name'] ?? 'Customer' }}</strong>,</p>
            <p>Selamat! Pembayaran untuk reservasi apartemen Anda telah berhasil dikonfirmasi. Berikut adalah detail pemesanan Anda:</p>

            <!-- Booking Details -->
            <div class="booking-details">
                <h3 style="margin-top: 0; color: #495057;">📋 Detail Pemesanan</h3>
                
                <div class="detail-row">
                    <span class="detail-label">Order ID:</span>
                    <span class="detail-value"><strong>{{ $transaction->order_id }}</strong></span>
                </div>
                
                <div class="detail-row">
                    <span class="detail-label">Apartemen:</span>
                    <span class="detail-value">{{ $transaction->apartment->name ?? 'N/A' }}</span>
                </div>
                
                <div class="detail-row">
                    <span class="detail-label">Check-in:</span>
                    <span class="detail-value">{{ $transaction->booking_data['check_in_date'] ? \Carbon\Carbon::parse($transaction->booking_data['check_in_date'])->format('d F Y') : 'N/A' }}</span>
                </div>
                
                <div class="detail-row">
                    <span class="detail-label">Check-out:</span>
                    <span class="detail-value">{{ $transaction->booking_data['check_out_date'] ? \Carbon\Carbon::parse($transaction->booking_data['check_out_date'])->format('d F Y') : 'N/A' }}</span>
                </div>
                
                <div class="detail-row">
                    <span class="detail-label">Durasi:</span>
                    <span class="detail-value">{{ $transaction->booking_data['duration'] ?? 'N/A' }} malam</span>
                </div>
                
                <div class="detail-row">
                    <span class="detail-label">Jumlah Tamu:</span>
                    <span class="detail-value">{{ $transaction->booking_data['guests'] ?? 'N/A' }} orang</span>
                </div>
                
                <div class="detail-row">
                    <span class="detail-label">Metode Pembayaran:</span>
                    <span class="detail-value">{{ strtoupper($transaction->payment_method ?? 'N/A') }}</span>
                </div>
            </div>

            <!-- Total Amount -->
            <div class="total-amount">
                <div>Total Pembayaran</div>
                <div class="amount">Rp {{ number_format($transaction->amount, 0, ',', '.') }}</div>
            </div>

            <!-- Voucher Section -->
            <div class="voucher-section">
                <h3 style="margin-top: 0; color: #856404;">🎫 KODE VOUCHER ANDA</h3>
                <p>Simpan kode ini dan tunjukkan saat check-in:</p>
                <div class="voucher-code">{{ $transaction['order_id'] }}</div>
                <p><small>*Wajib ditunjukkan bersama identitas diri</small></p>
            </div>

            <!-- Instructions -->
            <div class="instructions">
                <h3>📝 Petunjuk Check-in:</h3>
                <ul>
                    <li><strong>Waktu Check-in:</strong> Mulai pukul 14:00 WIB</li>
                    <li><strong>Waktu Check-out:</strong> Maksimal pukul 12:00 WIB</li>
                    <li><strong>Dokumen:</strong> Bawa identitas diri (KTP/SIM/Paspor)</li>
                    <li><strong>Kode Voucher:</strong> Tunjukkan kode di atas saat check-in</li>
                    <li><strong>Kontak Darurat:</strong> Hubungi kami jika ada kendala</li>
                </ul>
            </div>

            <p>Jika Anda memiliki pertanyaan atau memerlukan bantuan, jangan ragu untuk menghubungi customer service kami.</p>
            
            <p>Terima kasih telah memilih <strong>Lilo Apart</strong>. Kami menantikan kedatangan Anda!</p>
        </div>

        <!-- Footer -->
        <div class="footer">
            <p><strong>Lilo Apart</strong></p>
            <p>Apartemen Premium untuk Pengalaman Menginap Terbaik</p>
            
            <div class="contact-info">
                <p>📧 Email: noreply@liloapart.site</p>
                <p>🌐 Website: https://liloapart.site</p>
                <p>📱 Customer Service: Tersedia 24/7</p>
            </div>
            
            <p style="margin-top: 20px; font-size: 12px; color: #6c757d;">
                Email ini dikirim secara otomatis. Mohon tidak membalas email ini.
            </p>
        </div>
    </div>
</body>
</html>
