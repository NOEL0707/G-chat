const functions = require('firebase-functions');
const express = require('express')
const app = express();
const contactRoutes=require('./routes/contacts');
const userRoutes=require('./routes/users');
var cors = require('cors');
var admin = require("firebase-admin");
var serviceAccount = require("./g-chat-b833e-firebase-adminsdk-ggvwm-23593a11df.json");
const http = require('http').Server(app);
const port = 4444;
var connectedClients=[];
app.use(cors());
app.use(express.json());
// function setusers(uid,socketid){
//   for (const user of users) {
//     if(user.uid==uid){
//       user.socketid=socketid;
//       return;
//     }
//   }
//   users.push({uid:uid,socketid:socketid});
// }
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const socketIO = require('socket.io')(http, {
  cors: {
      origin: "*"
  }
});
app.use("/api/contact", contactRoutes);
app.use("/api/user", userRoutes);

//Add this before the app.get() block
socketIO.on('connection', (socket) => {
  connectedClients.push(socket);
  console.log(`⚡: ${socket.id} user just connected!`);
  socket.on('disconnect', () => {
    console.log('🔥: A user disconnected');
    const index = connectedClients.indexOf(socket);
    if (index !== -1) {
      connectedClients.splice(index, 1);
    }
  });
  socket.on('send-message',async (data)=>{
    console.log(data)
    const db = admin.firestore();
    const newMessage = {
      from: data.from,
      to: data.to,
      msg:data.text,
      sentAt: admin.firestore.FieldValue.serverTimestamp(),
    };
    const messageRef = db.collection('Messages');
    try {
      const docRef = await messageRef.add(newMessage);
      console.log('New message added with ID:', docRef.id);
    } catch (error) {
      console.error('Error adding new message:', error);
    }
    connectedClients.forEach((client) => {
      client.emit('check-messages');
      client.emit('update-sidebar');
    });
  })
});

app.get('/', (req, res) => {
  res.send('Home page of G-Chat  Application site!');
})


http.listen(4545, () => {
  console.log(`Server listening on ${4545}`);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
exports.api = functions.https.onRequest(app);

