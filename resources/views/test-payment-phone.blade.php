<!DOCTYPE html>
<html>
<head>
    <title>Test Payment with Phone</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; }
        .container { max-width: 600px; margin: 0 auto; }
        .form-group { margin-bottom: 15px; }
        label { display: block; margin-bottom: 5px; font-weight: bold; }
        input, select, textarea { width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px; }
        button { background: #007bff; color: white; padding: 10px 20px; border: none; border-radius: 4px; cursor: pointer; }
        button:hover { background: #0056b3; }
        .result { margin-top: 20px; padding: 15px; background: #f8f9fa; border-radius: 4px; }
        .error { background: #f8d7da; color: #721c24; }
        .success { background: #d4edda; color: #155724; }
    </style>
</head>
<body>
    <div class="container">
        <h1>Test Payment API with Phone Number</h1>
        
        <form id="paymentForm">
            <div class="form-group">
                <label for="customer_name">Nama Lengkap:</label>
                <input type="text" id="customer_name" name="customer_name" value="Test Customer" required>
            </div>
            
            <div class="form-group">
                <label for="customer_email">Email:</label>
                <input type="email" id="customer_email" name="customer_email" value="test@example.com" required>
            </div>
            
            <div class="form-group">
                <label for="customer_phone">Nomor Telepon:</label>
                <input type="tel" id="customer_phone" name="customer_phone" value="081234567890" required>
            </div>
            
            <div class="form-group">
                <label for="guests">Jumlah Tamu:</label>
                <select id="guests" name="guests">
                    <option value="1">1 Tamu</option>
                    <option value="2" selected>2 Tamu</option>
                    <option value="3">3 Tamu</option>
                    <option value="4">4 Tamu</option>
                </select>
            </div>
            
            <div class="form-group">
                <label for="check_in">Check-in:</label>
                <input type="date" id="check_in" name="check_in" value="2024-01-15" required>
            </div>
            
            <div class="form-group">
                <label for="check_out">Check-out:</label>
                <input type="date" id="check_out" name="check_out" value="2024-01-16" required>
            </div>
            
            <div class="form-group">
                <label for="payment_method">Metode Pembayaran:</label>
                <select id="payment_method" name="payment_method" required>
                    <option value="">Pilih Metode</option>
                    <option value="qris" selected>QRIS</option>
                    <option value="ewallet">E-Wallet</option>
                    <option value="va">Virtual Account</option>
                    <option value="cstore">Convenience Store</option>
                    <option value="akulaku">Akulaku</option>
                </select>
            </div>
            
            <div class="form-group">
                <label for="notes">Catatan:</label>
                <textarea id="notes" name="notes" rows="3">Test booking dengan nomor telepon</textarea>
            </div>
            
            <button type="submit">Test Payment API</button>
        </form>
        
        <div id="result"></div>
    </div>

    <script>
        document.getElementById('paymentForm').addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const formData = new FormData(e.target);
            const data = {
                apartment_id: 1,
                apartment_name: 'Malioboro co-living',
                customer_name: formData.get('customer_name'),
                customer_email: formData.get('customer_email'),
                customer_phone: formData.get('customer_phone'),
                guests: parseInt(formData.get('guests')),
                check_in: formData.get('check_in'),
                check_out: formData.get('check_out'),
                payment_method: formData.get('payment_method'),
                payment_provider: null,
                amount: 150000,
                nights: 1,
                notes: formData.get('notes')
            };
            
            const resultDiv = document.getElementById('result');
            resultDiv.innerHTML = '<p>Loading...</p>';
            
            try {
                const response = await fetch('/api/payment/create', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || ''
                    },
                    body: JSON.stringify(data)
                });
                
                const result = await response.json();
                
                if (result.success) {
                    resultDiv.innerHTML = `
                        <div class="result success">
                            <h3>✓ Payment API Success!</h3>
                            <p><strong>Order ID:</strong> ${result.order_id}</p>
                            <p><strong>Transaction ID:</strong> ${result.transaction_id}</p>
                            <p><strong>Booking Detail URL:</strong> <a href="${result.booking_detail_url}" target="_blank">${result.booking_detail_url}</a></p>
                            <p><strong>Has Snap Token:</strong> ${result.snap_token ? 'Yes' : 'No'}</p>
                            <hr>
                            <p><strong>Test URLs:</strong></p>
                            <ul>
                                <li><a href="/booking/success?order_id=${result.order_id}" target="_blank">Success Callback</a></li>
                                <li><a href="/booking/error?order_id=${result.order_id}" target="_blank">Error Callback</a></li>
                                <li><a href="/booking/pending?order_id=${result.order_id}" target="_blank">Pending Callback</a></li>
                                <li><a href="/booking/detail/${result.order_id}" target="_blank">Booking Detail</a></li>
                            </ul>
                        </div>
                    `;
                } else {
                    resultDiv.innerHTML = `
                        <div class="result error">
                            <h3>✗ Payment API Failed</h3>
                            <p><strong>Error:</strong> ${result.message}</p>
                        </div>
                    `;
                }
            } catch (error) {
                resultDiv.innerHTML = `
                    <div class="result error">
                        <h3>✗ Request Failed</h3>
                        <p><strong>Error:</strong> ${error.message}</p>
                    </div>
                `;
            }
        });
    </script>
</body>
</html>
