require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const Account = require('./models/Account')
const User = require('./models/User')




const authRouter = require('./routes/auth');
const storeRouter = require('./routes/store');
const prodCateRouter = require('./routes/productCategoy');
const prodRouter = require('./routes/product');
const keyMapRouter = require('./routes/keyMap');
const addressRouter = require('./routes/address');

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




// socket
const http = require('http');
const server = http.createServer(app);
const io = require('socket.io')(server, {
    cors: {
        origin: '*',
    },
    pingInterval: 10000,
    pingTimeout: 5000,
});

app.use('/api/auth', authRouter);
app.use('/api/store', storeRouter);
app.use('/api/product-category', prodCateRouter);
app.use('/api/product', prodRouter);
app.use('/api/key-map', keyMapRouter);
app.use('/api/address', addressRouter);

let member = {
    id: '',
    content: '',
    avatar: ''
}

let users = {}

io.on('connection', (socket) => {

    socket.on('new user', data =>{
        if(data in users){}else{
            socket.listChat = []
            socket.username = data
            users[socket.username] = socket
        }
    })

    // send message
    socket.on('send message',async data => {
        const {receiver, content, sender} = data

        // update for sender
        if(sender in users){
            const accountInfo = await Account.findOne({_id: receiver}).lean()

            if(accountInfo){
                let index = -1;
                const lengthChat = users[sender].listChat.length
                
                for(let i = 0; i < lengthChat; i++){
                    if(users[sender].listChat[i].id.toString() === receiver.toString()){
                        index = i
                        break
                    }
                }

                if(index !== -1){
                    users[sender].listChat[index] = {
                        ...users[sender].listChat[index],
                        listMessage: [...users[sender].listChat[index].listMessage, {
                            sender,
                            receiver,
                            content
                        }]
                    }

                }else{
                     
                    users[sender].listChat.push({
                        username: accountInfo.username,
                        id: accountInfo._id,
                        listMessage: [{
                            sender,
                            receiver,
                            content
                        }]
                    })
                }
    
                users[sender].emit('whisper', {
                    mess: content,
                    sender,
                    listChat: users[sender].listChat
                })
            }
        }


        // update for receiver
        if(receiver in users){
            const accountInfo = await Account.findOne({_id: sender}).lean()

            if(accountInfo){

                let index = -1;
                const lengthChat = users[receiver].listChat.length
                
                for(let i = 0; i < lengthChat; i++){
                    if(users[receiver].listChat[i].id.toString() === sender.toString()){
                        index = i
                        break
                    }
                }
                
                if(index !== -1){
                    users[receiver].listChat[index] = {
                        ...users[receiver].listChat[index],
                        listMessage: [...users[receiver].listChat[index].listMessage, {
                            sender,
                            receiver,
                            content
                        }]
                    }

                }else{
                     
                    users[receiver].listChat.push({
                        username: accountInfo.username,
                        id: accountInfo._id,
                        listMessage: [{
                            sender,
                            receiver,
                            content
                        }]
                    })
                }
    
                users[receiver].emit('whisper', {
                    mess: content,
                    sender,
                    listChat: users[receiver].listChat
                })
                
            }
            
        }
        
    })

});

const POST = 5000;
server.listen(POST, () => console.log("Server started on port 5000"))
