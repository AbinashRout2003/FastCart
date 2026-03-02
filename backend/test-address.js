const axios = require('axios');

async function testAddress() {
    try {
        // 1. Login to get cookie
        const loginRes = await axios.post('http://localhost:5000/api/user/login', {
            email: 'user.greatstack@gmail.com',
            password: '123'
        });

        console.log("Login User:", loginRes.data);
    } catch (err) {
        console.error("Test failed", err.response?.data || err.message);
    }
}

testAddress();
