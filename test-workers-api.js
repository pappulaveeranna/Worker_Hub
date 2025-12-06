const axios = require('axios');

async function testWorkersAPI() {
  try {
    console.log('Testing workers API...');
    
    // Test basic connection
    const healthResponse = await axios.get('http://localhost:5000/api/health');
    console.log('✅ Backend health check:', healthResponse.data);
    
    // Test workers endpoint
    const workersResponse = await axios.get('http://localhost:5000/api/workers');
    console.log('✅ Workers API response:', workersResponse.status);
    console.log('Workers data:', workersResponse.data);
    console.log(`Found ${workersResponse.data.length} workers`);
    
    if (workersResponse.data.length === 0) {
      console.log('⚠️  No workers found in database. Run: node backend/seedWorkers.js');
    } else {
      workersResponse.data.forEach((worker, index) => {
        console.log(`${index + 1}. ${worker.name} - ${worker.profession} - ₹${worker.charges}/hour - ${worker.location}`);
      });
    }
    
  } catch (error) {
    console.log('❌ API test failed:', error.message);
    if (error.response) {
      console.log('Error status:', error.response.status);
      console.log('Error data:', error.response.data);
    }
    console.log('Make sure the backend server is running on port 5000');
  }
}

testWorkersAPI();