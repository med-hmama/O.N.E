const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const { restrictTo, verify } = require('./controllers/verifyController');
const Image = require('./models/imageModel');
dotenv.config();
const app = express();
const path = require('path');


//importing routes
const authRoute = require('./routes/authRoute');
const userRoute = require('./routes/userRoute');
const paymentRoute = require('./routes/paymentRoute');
const postRoute = require('./routes/postRoute');
const entrepriseRoute = require('./routes/entrepriseRoute');
const deskRoute = require('./routes/deskRoute');
const eventRoute = require('./routes/eventRoute');
const messageRoute = require('./routes/messageRoute');


// Middleware
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));
app.use(express.json());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Request-Method', '*')
    res.setHeader('Access-Control-Allow-Headers', '*')
    res.setHeader('Access-Control-Allow-Method', '*')
    next()
})
app.use(cors())


//Connect to DB
mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true },)
    .then(() => console.log('Connected to DB'))
    .catch((err) => console.log(err));



//image upload
const storage = multer.diskStorage({
    destination: (req, file, callBack) => {
        callBack(null, 'uploads')
    },
    filename: (req, file, callBack) => {
        callBack(null, Date.now() + '-' + file.originalname)
    }
})
const upload = multer({ storage: storage })

app.post('/file', upload.single('file'), async (req, res, next) => {
    const file = new Image({
        image: "http://localhost:3000/uploads/" + req.file.filename,
    });
    await file.save();
    res.send(file);
});


//routes
app.use('/', authRoute);
app.use('/user', userRoute);
app.use('/payment', paymentRoute);
app.use('/posts', postRoute);
app.use('/entreprises', entrepriseRoute);
app.use('/desk', deskRoute);
app.use('/event', eventRoute);
app.use('/message', messageRoute);



app.listen(process.env.port, () => console.log('Running'));