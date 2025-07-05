import axios from 'axios';

// Test payment API
const testPaymentAPI = async () => {
    try {
        const paymentData = {
            apartment_id: 1,
            apartment_name: "Test Apartment",
            customer_name: "John Doe",
            customer_email: "john@example.com", // Valid email
            check_in: "2025-07-10",
            check_out: "2025-07-12",
            payment_method: "qris",
            payment_provider: null,
            amount: 925000,
            nights: 2,
            notes: "Test booking"
        };

        console.log('Testing payment API with data:', paymentData);

        const response = await axios.post('http://localhost:8000/api/payment/create', paymentData, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });

        console.log('Response:', response.data);
        
        if (response.data.success) {
            console.log('Payment API test successful!');
            console.log('Snap token:', response.data.snap_token);
        } else {
            console.error('Payment API test failed:', response.data.message);
        }
    } catch (error) {
        console.error('Error testing payment API:', error.response?.data || error.message);
    }
};

testPaymentAPI();
