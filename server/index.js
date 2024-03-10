const express = require('express')
const cors = require('cors')

const { mongoConnect } = require('./src/services/mongo')
const authRouter = require('./src/routes/user/user.routes')
const msgRoutes = require('./src/routes/messages/msg.routes')
const socket = require('socket.io')

require("dotenv").config();
const app = express()

app.use(cors());
app.use(express.json());
app.use('/api/auth/', authRouter)
app.use('/api/msg/', msgRoutes)

async function startServer() {
    await mongoConnect();
}
startServer();
const server = app.listen(process.env.PORT, () => {
    console.log(`server is sunning at ${process.env.PORT}`);
})

const io = socket(server, {
    cors: {
        origin: "http://localhost:3000",
        credentials: true,
    }
});
global.onlineUsers = new Map();
io.on("connection", (socket) => {
    global.chatSocket = socket;
    socket.on("add-user", (userId) => {
        onlineUsers.set(userId, socket.id)
    })
    socket.on("send-msg", (data) => {
        const sendUserSocket = onlineUsers.get(data.to)
        if (sendUserSocket) {
            socket.to(sendUserSocket).emit("msg-recieve", data.message)
        }
    })
})

