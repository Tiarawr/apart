const testCallbackUrls = () => {
    console.log('Testing callback URLs...');
    
    // Test data
    const orderId = 'BOOKING-1234567890-5678';
    const baseUrl = 'http://localhost:8000';
    
    // Test URLs
    const urls = {
        success: `${baseUrl}/booking/success?order_id=${orderId}`,
        error: `${baseUrl}/booking/error?order_id=${orderId}`,
        pending: `${baseUrl}/booking/pending?order_id=${orderId}`,
        detail: `${baseUrl}/booking/detail/${orderId}`
    };
    
    console.log('Generated URLs:', urls);
    
    // Test each URL
    Object.entries(urls).forEach(([type, url]) => {
        console.log(`Testing ${type}: ${url}`);
        
        fetch(url)
            .then(response => {
                console.log(`${type} response:`, response.status, response.statusText);
                if (response.ok) {
                    console.log(`✓ ${type} callback works`);
                } else {
                    console.log(`✗ ${type} callback failed`);
                }
            })
            .catch(error => {
                console.log(`✗ ${type} callback error:`, error.message);
            });
    });
};

// Test payment API
const testPaymentApi = async () => {
    console.log('Testing payment API...');
    
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
    
    try {
        const response = await fetch('/api/payment/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(testData)
        });
        
        const data = await response.json();
        console.log('Payment API response:', data);
        
        if (data.success) {
            console.log('✓ Payment API works');
            console.log('Order ID:', data.order_id);
            console.log('Booking Detail URL:', data.booking_detail_url);
            
            // Test the booking detail URL
            if (data.booking_detail_url) {
                fetch(data.booking_detail_url)
                    .then(response => {
                        console.log('Booking detail response:', response.status);
                        if (response.ok) {
                            console.log('✓ Booking detail page accessible');
                        } else {
                            console.log('✗ Booking detail page not accessible');
                        }
                    })
                    .catch(error => {
                        console.log('✗ Booking detail error:', error.message);
                    });
            }
        } else {
            console.log('✗ Payment API failed:', data.message);
        }
    } catch (error) {
        console.log('✗ Payment API error:', error.message);
    }
};

// Run tests
testCallbackUrls();
testPaymentApi();
