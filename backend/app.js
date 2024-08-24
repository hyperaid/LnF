require('dotenv').config();

const cors = require('cors');
const express = require('express');
const cookieParser = require('cookie-parser');
const ejs = require('ejs');

const app = express();
const Router = require('./routes/index.router');
const {dailyUpdate} = require('./scheduler/dailyUpdate');
const {mailSenderService} = require('./services/mail.service');

app.use(cookieParser());

const data = [{
    'id': '62fa33a0cbc2396a690af096',
    'description': 'Finally we are free',
    'image': 'https://res.cloudinary.com/masterchief/image/upload/v1660564384/lostAndFound/iowv9ws2ubzcfjkulwjz.webp',
    'location': '1800s',
    'title': 'independence',
    'dateTime': '2022-08-15T11:52',
    'itemTag': 'free',
    'claimedBy': '  ',
    'type': 'Found',
    'firstName': 'abhinav',
    'lastName': 'sharma',
    'submittedBy': 'abhinav@abhinav.ac.in'
}, ];

data.map(item => {
    item.date = new Date(item.dateTime).toDateString();
});

app.get('/', function (req, res) {
    ejs.renderFile(__dirname + '/views/newsletter.ejs', {items: data}, (err, data) => {
        if (err)
            console.log(err);
        else
            res.send(data);
    });
});

const user = {
    batch: '20xx',
    email: 'xxxxxxx@iiitdmj.ac.in',
    exp: '2022-09-08T14:40:06.598Z',
    family_name: 'Last Name',
    given_name: 'First Name',
    hallNumber: 'X',
    iat: 1662646206,
    locale: 'en',
    name: 'SHASWAT GUPTA',
    phoneNumber: '1234567890',
    picture: 'https://lh3.googleusercontent.com/a-/AFdZucqPBNNnpOvukiReMQN_WzYdP_LHHhYghppQ9z9I=s96-c',
    registeredAt: 1659191332,
    roll: 'XXXXXX',
    roomNumber: 'H-000',
    sub: 109382847279098430000,
    _id: '62e54024606a7bc92d6dadb4'
};

app.get('/mail', async function (req, res) {
    ejs.renderFile(__dirname + '/views/claim.ejs', {user: user, type: 0}, (err, data) => {
        if (err)
            console.log(err);
        else
            res.send(data);
    });
});

app.use(express.urlencoded({
    limit: '50mb',
    extended: true,
}));

app.enable('trust proxy');

app.use(express.json({limit: '50mb'}));
app.use(cors({
    credentials: true,
    origin: ['http://localhost:3000','https://lnf-f7xy.onrender.com','https://lnf-12icide4x-hyperraids-projects.vercel.app']
}));

 

app.use('/', Router);

dailyUpdate();

module.exports = app;
