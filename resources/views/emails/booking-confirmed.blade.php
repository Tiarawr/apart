<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Booking Confirmation - {{ $transaction->order_id }}</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
        }
        .header {
            background: #4F46E5;
            color: white;
            padding: 20px;
            text-align: center;
            border-radius: 8px 8px 0 0;
        }
        .content {
            background: #f9f9f9;
            padding: 30px;
            border: 1px solid #ddd;
        }
        .booking-details {
            background: white;
            padding: 20px;
            border-radius: 8px;
            margin: 20px 0;
        }
        .detail-row {
            display: flex;
            justify-content: space-between;
            padding: 8px 0;
            border-bottom: 1px solid #eee;
        }
        .amount {
            font-size: 24px;
            font-weight: bold;
            color: #059669;
            text-align: center;
            margin: 20px 0;
        }
        .footer {
            background: #374151;
            color: white;
            padding: 20px;
            text-align: center;
            border-radius: 0 0 8px 8px;
            font-size: 14px;
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>🎉 Booking Confirmed!</h1>
        <p>Thank you for choosing Lilo Apart</p>
    </div>

    <div class="content">
        <h2>Hello {{ $transaction->customer_name }},</h2>
        
        <p>Great news! Your payment has been successfully processed and your booking is confirmed.</p>

        <div class="booking-details">
            <h3>Booking Details</h3>
            
            <div class="detail-row">
                <span><strong>Order ID:</strong></span>
                <span>{{ $transaction->order_id }}</span>
            </div>
            
            <div class="detail-row">
                <span><strong>Apartment:</strong></span>
                <span>{{ $transaction->booking_data['apartment_name'] ?? 'Apartment' }}</span>
            </div>
            
            <div class="detail-row">
                <span><strong>Guest Name:</strong></span>
                <span>{{ $transaction->customer_name }}</span>
            </div>
            
            <div class="detail-row">
                <span><strong>Check-in:</strong></span>
                <span>{{ \Carbon\Carbon::parse($transaction->check_in)->format('d M Y') }}</span>
            </div>
            
            <div class="detail-row">
                <span><strong>Check-out:</strong></span>
                <span>{{ \Carbon\Carbon::parse($transaction->check_out)->format('d M Y') }}</span>
            </div>
            
            <div class="detail-row">
                <span><strong>Duration:</strong></span>
                <span>{{ $transaction->nights }} night(s)</span>
            </div>
            
            <div class="detail-row">
                <span><strong>Payment Method:</strong></span>
                <span>{{ strtoupper($transaction->payment_method) }}</span>
            </div>
        </div>

        <div class="amount">
            Total Paid: Rp {{ number_format($transaction->amount, 0, ',', '.') }}
        </div>

        <p><strong>What's Next?</strong></p>
        <ul>
            <li>You will receive check-in instructions 24 hours before your arrival</li>
            <li>Please bring a valid ID for verification</li>
            <li>Contact us if you have any special requests</li>
        </ul>

        <p>If you have any questions, feel free to contact us at hello@apart-app.com</p>
        
        <p>We look forward to hosting you!</p>
        
        <p>Best regards,<br>
        <strong>Lilo Apart Team</strong></p>
    </div>

    <div class="footer">
        <p>&copy; {{ date('Y') }} Lilo Apart. All rights reserved.</p>
        <p>This is an automated email, please do not reply directly to this message.</p>
    </div>
</body>
</html>
