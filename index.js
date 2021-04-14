require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');


const authRouter = require('./routes/auth');
const storeRouter = require('./routes/store');

const connectDB = async () =>{
    try {
        await mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@barista-database.2uidm.mongodb.net/barista-database?retryWrites=true&w=majority`, {
            // Các tham số này là mặc định
            useCreateIndex: true,
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        })

        console.log("MongoDB Connected")
    } catch (error) {
        console.log("eror", error.message);
        // Restart lại
        process.exit(1);
    }
}
connectDB();

const app = express();
const corsOptions ={
    origin:['http://localhost:3600', 'http://localhost:3800'], 
    credentials:true,          
    optionSuccessStatus:200
}
app.use(express.json());
app.use(cors(corsOptions));

app.use('/api/auth', authRouter);
app.use('/api/store', storeRouter);

const POST = 5000;
app.listen(POST, () => console.log("Server started on port 5000"))