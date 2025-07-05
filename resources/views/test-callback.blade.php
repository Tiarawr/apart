<!DOCTYPE html>
<html>
<head>
    <title>Test Payment Callback</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; }
        .container { max-width: 800px; margin: 0 auto; }
        .test-section { margin: 20px 0; padding: 20px; border: 1px solid #ddd; }
        .btn { padding: 10px 20px; margin: 10px; background: #007bff; color: white; border: none; cursor: pointer; }
        .btn:hover { background: #0056b3; }
        .result { margin: 10px 0; padding: 10px; background: #f8f9fa; border: 1px solid #dee2e6; }
    </style>
</head>
<body>
    <div class="container">
        <h1>Test Payment Callback URLs</h1>
        
        <div class="test-section">
            <h2>1. Test Callback URL Generation</h2>
            <p>Testing if callback URLs are generated correctly...</p>
            
            <?php
            $orderId = 'BOOKING-' . time() . '-' . rand(1000, 9999);
            echo "<div class='result'>";
            echo "<strong>Generated Order ID:</strong> $orderId<br>";
            echo "<strong>Finish URL:</strong> " . url("/booking/success?order_id=$orderId") . "<br>";
            echo "<strong>Error URL:</strong> " . url("/booking/error?order_id=$orderId") . "<br>";
            echo "<strong>Pending URL:</strong> " . url("/booking/pending?order_id=$orderId") . "<br>";
            echo "<strong>Detail URL:</strong> " . url("/booking/detail/$orderId") . "<br>";
            echo "</div>";
            ?>
        </div>
        
        <div class="test-section">
            <h2>2. Test Callback Redirect</h2>
            <p>Click these buttons to test if callback URLs redirect correctly to booking detail page:</p>
            
            <button class="btn" onclick="testCallback('success', '<?php echo $orderId; ?>')">Test Success Callback</button>
            <button class="btn" onclick="testCallback('error', '<?php echo $orderId; ?>')">Test Error Callback</button>
            <button class="btn" onclick="testCallback('pending', '<?php echo $orderId; ?>')">Test Pending Callback</button>
            
            <div id="callback-result" class="result" style="display: none;">
                <strong>Result:</strong> <span id="callback-message"></span>
            </div>
        </div>
        
        <div class="test-section">
            <h2>3. Test Direct Booking Detail Access</h2>
            <p>Click to test direct access to booking detail page:</p>
            
            <button class="btn" onclick="testDirectAccess('<?php echo $orderId; ?>')">Test Direct Access</button>
            
            <div id="direct-result" class="result" style="display: none;">
                <strong>Result:</strong> <span id="direct-message"></span>
            </div>
        </div>
        
        <div class="test-section">
            <h2>4. Create Real Transaction for Testing</h2>
            <p>Create a real transaction to test the full flow:</p>
            
            <button class="btn" onclick="createTestTransaction()">Create Test Transaction</button>
            
            <div id="transaction-result" class="result" style="display: none;">
                <strong>Result:</strong> <span id="transaction-message"></span>
            </div>
        </div>
    </div>

    <script>
        function testCallback(type, orderId) {
            const url = `/booking/${type}?order_id=${orderId}`;
            
            fetch(url)
                .then(response => {
                    if (response.ok) {
                        document.getElementById('callback-result').style.display = 'block';
                        document.getElementById('callback-message').textContent = `✓ ${type} callback works - redirected to ${response.url}`;
                    } else {
                        document.getElementById('callback-result').style.display = 'block';
                        document.getElementById('callback-message').textContent = `✗ ${type} callback failed - ${response.status}`;
                    }
                })
                .catch(error => {
                    document.getElementById('callback-result').style.display = 'block';
                    document.getElementById('callback-message').textContent = `✗ ${type} callback error - ${error.message}`;
                });
        }
        
        function testDirectAccess(orderId) {
            const url = `/booking/detail/${orderId}`;
            
            fetch(url)
                .then(response => {
                    if (response.ok) {
                        document.getElementById('direct-result').style.display = 'block';
                        document.getElementById('direct-message').textContent = `✓ Direct access works - ${response.status}`;
                    } else if (response.status === 404) {
                        document.getElementById('direct-result').style.display = 'block';
                        document.getElementById('direct-message').textContent = `✗ Direct access failed - Transaction not found (expected for test order)`;
                    } else {
                        document.getElementById('direct-result').style.display = 'block';
                        document.getElementById('direct-message').textContent = `✗ Direct access failed - ${response.status}`;
                    }
                })
                .catch(error => {
                    document.getElementById('direct-result').style.display = 'block';
                    document.getElementById('direct-message').textContent = `✗ Direct access error - ${error.message}`;
                });
        }
        
        function createTestTransaction() {
            const testData = {
                apartment_id: 1,
                customer_name: 'Test Customer',
                customer_email: 'test@example.com',
                check_in: '2024-01-15',
                check_out: '2024-01-16',
                payment_method: 'qris',
                payment_provider: null,
                amount: 150000,
                nights: 1,
                notes: 'Test transaction for callback testing'
            };
            
            fetch('/api/payment/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || ''
                },
                body: JSON.stringify(testData)
            })
            .then(response => response.json())
            .then(data => {
                document.getElementById('transaction-result').style.display = 'block';
                if (data.success) {
                    document.getElementById('transaction-message').innerHTML = `
                        ✓ Transaction created successfully!<br>
                        Order ID: ${data.order_id}<br>
                        Booking Detail URL: <a href="${data.booking_detail_url}" target="_blank">${data.booking_detail_url}</a>
                    `;
                } else {
                    document.getElementById('transaction-message').textContent = `✗ Transaction failed - ${data.message}`;
                }
            })
            .catch(error => {
                document.getElementById('transaction-result').style.display = 'block';
                document.getElementById('transaction-message').textContent = `✗ Transaction error - ${error.message}`;
            });
        }
    </script>
</body>
</html>
