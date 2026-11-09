require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const connectToDB = require('./database/db');
const authRoutes = require('./routes/auth-routes');
const reportRoutes = require('./routes/reportRoutes');
const alertRoutes = require('./routes/sendAlert');
const cors = require('cors');

// Connecting the database
connectToDB();


//Creating express app
const app = express();

// middleware 
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: [
        "http://localhost:5173",
        "https://ourlocalproblems.vercel.app"
    ],
    credentials: true
}));



//Routing
app.use('/auth',authRoutes);
app.use('/report',reportRoutes);
app.use('/alert',alertRoutes);

const PORT = process.env.port;
app.listen(PORT,()=>
{
    console.log(`Server running on port: ${PORT}`);
})