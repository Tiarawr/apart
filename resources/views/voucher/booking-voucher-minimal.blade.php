<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Voucher - {{ $transaction->order_id }}</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            font-size: 14px;
            line-height: 1.6;
            color: #000;
            padding: 40px;
        }
        .header {
            text-align: center;
            border-bottom: 2px solid #000;
            padding-bottom: 20px;
            margin-bottom: 30px;
        }
        .logo {
            font-size: 28px;
            font-weight: bold;
            margin-bottom: 10px;
        }
        .order-id {
            font-size: 16px;
            background: #f0f0f0;
            padding: 10px;
            border: 1px solid #000;
            display: inline-block;
        }
        .content {
            margin-bottom: 30px;
        }
        .section {
            margin-bottom: 20px;
        }
        .section-title {
            font-weight: bold;
            font-size: 16px;
            margin-bottom: 10px;
            border-bottom: 1px solid #000;
            padding-bottom: 5px;
        }
        .info-row {
            margin-bottom: 8px;
        }
        .label {
            display: inline-block;
            width: 120px;
            font-weight: bold;
        }
        .total {
            text-align: center;
            font-size: 20px;
            font-weight: bold;
            border: 2px solid #000;
            padding: 15px;
            margin-top: 20px;
        }
    </style>
</head>
<body>
    <div class="header">
        <div class="logo">LILO APART</div>
        <div>VOUCHER PEMESANAN</div>
        <div class="order-id">{{ $transaction->order_id }}</div>
    </div>
    
    <div class="content">
        <div class="section">
            <div class="section-title">INFORMASI TAMU</div>
            <div class="info-row">
                <span class="label">Nama:</span>
                {{ $transaction->booking_data['guest_name'] ?? 'N/A' }}
            </div>
            <div class="info-row">
                <span class="label">Email:</span>
                {{ $transaction->customer_email }}
            </div>
            <div class="info-row">
                <span class="label">Telepon:</span>
                {{ $transaction->booking_data['guest_phone'] ?? 'N/A' }}
            </div>
        </div>
        
        <div class="section">
            <div class="section-title">DETAIL PEMESANAN</div>
            <div class="info-row">
                <span class="label">Apartemen:</span>
                {{ $transaction->apartment->name ?? 'N/A' }}
            </div>
            <div class="info-row">
                <span class="label">Check-in:</span>
                {{ $transaction->booking_data['check_in_date'] ? \Carbon\Carbon::parse($transaction->booking_data['check_in_date'])->format('d M Y') : 'N/A' }}
            </div>
            <div class="info-row">
                <span class="label">Check-out:</span>
                {{ $transaction->booking_data['check_out_date'] ? \Carbon\Carbon::parse($transaction->booking_data['check_out_date'])->format('d M Y') : 'N/A' }}
            </div>
            <div class="info-row">
                <span class="label">Durasi:</span>
                {{ $transaction->booking_data['duration'] ?? 'N/A' }} malam
            </div>
            <div class="info-row">
                <span class="label">Tamu:</span>
                {{ $transaction->booking_data['guests'] ?? 'N/A' }} orang
            </div>
        </div>
        
        <div class="total">
            TOTAL: Rp {{ number_format($transaction->amount, 0, ',', '.') }}
        </div>
        
        <div style="text-align: center; margin-top: 40px; font-size: 12px;">
            <div style="margin-bottom: 10px;">
                <strong>Tunjukkan voucher ini saat check-in</strong>
            </div>
            <div>Check-in: 14:00 | Check-out: 12:00</div>
            <div>info@liloapart.site</div>
        </div>
    </div>
</body>
</html>
