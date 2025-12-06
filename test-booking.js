const axios = require('axios');

async function testBooking() {
  try {
    console.log('Testing booking functionality...');
    
    // First, test login to get a token
    const loginResponse = await axios.post('http://localhost:5000/api/users/login', {
      email: 'test@example.com',
      password: 'password123'
    });
    
    const token = loginResponse.data.token;
    console.log('✅ Login successful, token obtained');
    
    // Get workers to book
    const workersResponse = await axios.get('http://localhost:5000/api/workers');
    if (workersResponse.data.length === 0) {
      console.log('❌ No workers available. Run: node backend/seedWorkers.js');
      return;
    }
    
    const worker = workersResponse.data[0];
    console.log(`✅ Found worker: ${worker.name} (${worker.profession})`);
    
    // Create a test booking
    const bookingData = {
      worker: worker._id,
      service: 'Test plumbing service',
      date: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0], // Tomorrow
      time: '10:00',
      address: '123 Test Street, Test City',
      totalAmount: worker.charges
    };
    
    const bookingResponse = await axios.post('http://localhost:5000/api/bookings', bookingData, {
      headers: { Authorization: `Bearer ${token}` }
    });
    
    console.log('✅ Booking created successfully:', bookingResponse.data);
    
    // Test getting user bookings
    const userBookingsResponse = await axios.get('http://localhost:5000/api/bookings', {
      headers: { Authorization: `Bearer ${token}` }
    });
    
    console.log(`✅ User has ${userBookingsResponse.data.length} bookings`);
    
  } catch (error) {
    console.log('❌ Booking test failed:', error.message);
    if (error.response) {
      console.log('Error status:', error.response.status);
      console.log('Error data:', error.response.data);
    }
  }
}

testBooking();