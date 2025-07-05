<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Test Booking Form</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f5f5f5;
        }
        .test-container {
            background: white;
            padding: 30px;
            border-radius: 10px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        .form-group {
            margin-bottom: 20px;
        }
        label {
            display: block;
            margin-bottom: 5px;
            font-weight: bold;
            color: #333;
        }
        input, select, textarea {
            width: 100%;
            padding: 12px;
            border: 2px solid #ddd;
            border-radius: 5px;
            font-size: 14px;
        }
        input:focus, select:focus, textarea:focus {
            outline: none;
            border-color: #007bff;
        }
        .form-row {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 20px;
        }
        .btn {
            background: #007bff;
            color: white;
            padding: 12px 24px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            font-size: 16px;
            font-weight: bold;
        }
        .btn:hover {
            background: #0056b3;
        }
        .result {
            margin-top: 20px;
            padding: 15px;
            border-radius: 5px;
        }
        .success {
            background: #d4edda;
            color: #155724;
            border: 1px solid #c3e6cb;
        }
        .error {
            background: #f8d7da;
            color: #721c24;
            border: 1px solid #f5c6cb;
        }
        .info {
            background: #d1ecf1;
            color: #0c5460;
            border: 1px solid #bee5eb;
        }
    </style>
</head>
<body>
    <div class="test-container">
        <h1>Test Booking Form - Dengan Nomor Telepon</h1>
        <p>Form ini untuk menguji apakah semua field termasuk nomor telepon sudah berfungsi dengan baik.</p>
        
        <form id="bookingForm">
            <div class="form-row">
                <div class="form-group">
                    <label for="name">Nama Lengkap *</label>
                    <input type="text" id="name" name="name" value="Sandoer Test" required>
                </div>
                
                <div class="form-group">
                    <label for="email">Email *</label>
                    <input type="email" id="email" name="email" value="nailaym@students.unnes.ac.id" required>
                </div>
            </div>
            
            <div class="form-row">
                <div class="form-group">
                    <label for="phone">Nomor Telepon *</label>
                    <input type="tel" id="phone" name="phone" value="081234567890" required>
                </div>
                
                <div class="form-group">
                    <label for="guests">Jumlah Tamu</label>
                    <select id="guests" name="guests">
                        <option value="1">1 Tamu</option>
                        <option value="2" selected>2 Tamu</option>
                        <option value="3">3 Tamu</option>
                        <option value="4">4 Tamu</option>
                    </select>
                </div>
            </div>
            
            <div class="form-row">
                <div class="form-group">
                    <label for="check_in">Check-in *</label>
                    <input type="date" id="check_in" name="check_in" value="2025-07-10" required>
                </div>
                
                <div class="form-group">
                    <label for="check_out">Check-out *</label>
                    <input type="date" id="check_out" name="check_out" value="2025-07-11" required>
                </div>
            </div>
            
            <div class="form-row">
                <div class="form-group">
                    <label for="payment_method">Metode Pembayaran *</label>
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
                    <label for="payment_provider">Provider (Opsional)</label>
                    <select id="payment_provider" name="payment_provider">
                        <option value="">Pilih Provider</option>
                        <option value="gopay">GoPay</option>
                        <option value="dana">DANA</option>
                        <option value="linkaja">LinkAja</option>
                        <option value="shopeepay">ShopeePay</option>
                        <option value="bca_va">BCA Virtual Account</option>
                        <option value="bni_va">BNI Virtual Account</option>
                        <option value="mandiri_va">Mandiri Virtual Account</option>
                        <option value="alfamart">Alfamart</option>
                        <option value="indomaret">Indomaret</option>
                    </select>
                </div>
            </div>
            
            <div class="form-group">
                <label for="notes">Catatan (Opsional)</label>
                <textarea id="notes" name="notes" rows="3" placeholder="Permintaan khusus atau catatan...">Test booking dengan nomor telepon</textarea>
            </div>
            
            <button type="submit" class="btn">Test Booking API</button>
        </form>
        
        <div id="result"></div>
    </div>

    <script>
        document.getElementById('bookingForm').addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const formData = new FormData(e.target);
            const data = {
                apartment_id: 1,
                apartment_name: 'Malioboro co-living',
                customer_name: formData.get('name'),
                customer_email: formData.get('email'),
                customer_phone: formData.get('phone'),
                guests: parseInt(formData.get('guests')),
                check_in: formData.get('check_in'),
                check_out: formData.get('check_out'),
                payment_method: formData.get('payment_method'),
                payment_provider: formData.get('payment_provider') || null,
                amount: 475000, // 450k + 25k service fee
                nights: 1,
                notes: formData.get('notes')
            };
            
            const resultDiv = document.getElementById('result');
            resultDiv.innerHTML = '<div class="result info">Mengirim data...</div>';
            
            console.log('Data yang dikirim:', data);
            
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
                console.log('Response:', result);
                
                if (result.success) {
                    resultDiv.innerHTML = `
                        <div class="result success">
                            <h3>✓ Booking Berhasil Dibuat!</h3>
                            <p><strong>Order ID:</strong> ${result.order_id}</p>
                            <p><strong>Transaction ID:</strong> ${result.transaction_id}</p>
                            <p><strong>Snap Token:</strong> ${result.snap_token ? 'Ada' : 'Tidak Ada'}</p>
                            <hr>
                            <p><strong>Test Links:</strong></p>
                            <ul>
                                <li><a href="${result.booking_detail_url}" target="_blank">Booking Detail</a></li>
                                <li><a href="/booking/success?order_id=${result.order_id}" target="_blank">Success Callback</a></li>
                                <li><a href="/booking/error?order_id=${result.order_id}" target="_blank">Error Callback</a></li>
                                <li><a href="/booking/pending?order_id=${result.order_id}" target="_blank">Pending Callback</a></li>
                            </ul>
                            <p><em>Klik link "Booking Detail" untuk melihat apakah semua data termasuk nomor telepon sudah muncul dengan benar.</em></p>
                        </div>
                    `;
                } else {
                    resultDiv.innerHTML = `
                        <div class="result error">
                            <h3>✗ Booking Gagal</h3>
                            <p><strong>Error:</strong> ${result.message}</p>
                            <pre>${JSON.stringify(result, null, 2)}</pre>
                        </div>
                    `;
                }
            } catch (error) {
                resultDiv.innerHTML = `
                    <div class="result error">
                        <h3>✗ Request Error</h3>
                        <p><strong>Error:</strong> ${error.message}</p>
                    </div>
                `;
            }
        });
    </script>
</body>
</html>
