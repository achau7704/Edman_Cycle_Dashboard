const express = require("express");
const app = express();
const http = require("http");
const {Server} = require("socket.io");
const cors = require("cors");

app.use(cors())

const server = http.createServer(app)

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    }
})

io.on("connection", (socket) => {
    console.log(`User Connected: ${socket.id}`)

    socket.on("readTemp", (data) => {
        console.log(data)
        if (data.length > 20) {
            data.reverse().pop()
            data.reverse()
            data.push({ "x": data[data.length - 1].name + 1, "y": data[data.length - 1].y })
        }
        socket.broadcast.emit("receiveTemp", data)
    })

    socket.on("readFlow", (data) => {
        console.log(data)
        socket.broadcast.emit("receiveFlow", data)
    })

    socket.on("readEdman", (data) => {
        console.log(data)
        socket.broadcast.emit("receiveEdman", data)
    })

    socket.on('startButtonClicked', (data) => {
        console.log(data)
        socket.broadcast.emit("totalNumCyclesData", data)
    })

    socket.on("disconnection", () => {
        console.log(`User Disconnected: ${socket.id}`)
    })
})


server.listen(3001, () => {
    console.log("Server is running on port 3001.")
});