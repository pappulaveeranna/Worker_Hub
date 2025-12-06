// Simple test to check if backend is running
const axios = require('axios');

async function testBackend() {
  try {
    console.log('Testing backend connection...');
    const response = await axios.get('http://localhost:5000/api/health');
    console.log('✅ Backend is running!');
    console.log('Response:', response.data);
  } catch (error) {
    console.log('❌ Backend connection failed:');
    console.log('Error:', error.message);
    if (error.code === 'ECONNREFUSED') {
      console.log('💡 Make sure to start your backend server with: npm start');
    }
  }
}

testBackend();