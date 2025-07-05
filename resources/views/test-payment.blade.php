<!DOCTYPE html>
<html>
<head>
    <title>Test Midtrans Snap</title>
    <script type="text/javascript"
        src="https://app.sandbox.midtrans.com/snap/snap.js"
        data-client-key="{{ config('midtrans.client_key') }}"></script>
</head>
<body>
    <div style="padding: 20px;">
        <h1>Test Midtrans Snap Payment Methods</h1>
        
        <div style="margin: 20px 0;">
            <button onclick="testQRIS()" style="padding: 10px; margin: 5px; background: #007bff; color: white; border: none; border-radius: 5px;">
                Test QRIS
            </button>
            <button onclick="testBCAVA()" style="padding: 10px; margin: 5px; background: #28a745; color: white; border: none; border-radius: 5px;">
                Test BCA VA
            </button>
            <button onclick="testAkulaku()" style="padding: 10px; margin: 5px; background: #dc3545; color: white; border: none; border-radius: 5px;">
                Test Akulaku
            </button>
            <button onclick="testGoPay()" style="padding: 10px; margin: 5px; background: #17a2b8; color: white; border: none; border-radius: 5px;">
                Test GoPay
            </button>
        </div>
        
        <div id="result" style="margin-top: 20px; padding: 10px; background: #f8f9fa; border: 1px solid #dee2e6; border-radius: 5px;">
            Click a button to test payment method
        </div>
    </div>

    <script>
        function testPayment(paymentMethod, paymentProvider = null) {
            const data = {
                apartment_id: 1,
                customer_name: 'Test User',
                customer_email: 'test@example.com',
                check_in: '2025-07-10',
                check_out: '2025-07-12',
                payment_method: paymentMethod,
                payment_provider: paymentProvider,
                amount: 1025000,
                nights: 2,
                notes: 'Test booking - ' + paymentMethod
            };

            fetch('/api/payment/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || ''
                },
                body: JSON.stringify(data)
            })
            .then(response => response.json())
            .then(result => {
                document.getElementById('result').innerHTML = 
                    '<strong>API Response:</strong><br>' + 
                    '<pre>' + JSON.stringify(result, null, 2) + '</pre>';
                
                if (result.success && result.snap_token) {
                    snap.pay(result.snap_token, {
                        onSuccess: function(result) {
                            alert('Payment Success: ' + JSON.stringify(result));
                        },
                        onPending: function(result) {
                            alert('Payment Pending: ' + JSON.stringify(result));
                        },
                        onError: function(result) {
                            alert('Payment Error: ' + JSON.stringify(result));
                        },
                        onClose: function() {
                            alert('Payment popup closed');
                        }
                    });
                }
            })
            .catch(error => {
                document.getElementById('result').innerHTML = 
                    '<strong>Error:</strong><br>' + error.message;
            });
        }

        function testQRIS() {
            testPayment('qris');
        }

        function testBCAVA() {
            testPayment('va', 'bca_va');
        }

        function testAkulaku() {
            testPayment('akulaku');
        }

        function testGoPay() {
            testPayment('ewallet', 'gopay');
        }
    </script>
</body>
</html>
