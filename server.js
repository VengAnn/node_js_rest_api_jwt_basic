const express = require('express');
const dotenv = require('dotenv');
const db = require('./config/database');
const apiRoutes = require('./routes/api');

const fs = require('fs');
const path = require('path');

// Check and create the public/images directory
const dir = path.join(__dirname, 'public/images');
if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log('Directory created:', dir);
} else {
    console.log('Directory already exists:', dir);
}

// Load environment variables
dotenv.config();

const app = express();
app.use(express.json());

// Routes
app.use('/api', apiRoutes);

//Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


//This for run with my own IP address Start the server
// const IP_ADDRESS = '192.168.0.105';
// const PORT = process.env.PORT || 3000;
// app.listen(PORT, IP_ADDRESS, () => {
//     console.log(`Server is running on port ${PORT}`);
// });
