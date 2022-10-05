import bodyParser from 'body-parser';
import express, { urlencoded } from 'express';
import Dotenv from 'dotenv';
import mongoose from 'mongoose';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import Data from "./data.js";
import Videos from './dbModel.js'

Dotenv.config();
const app = express();

app.use(urlencoded({extended: true}));

app.use(express.json())
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*"),
        res.setHeader("Access-Control-Allow-Headers", "*"),
        next();
});

app.use(express.static('public'));

const connection_url = process.env.MONGODB;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

mongoose.connect(connection_url);


app.get('/', function (req, res) {
    res.send("<h1>hello world</h1>")
});

app.get("/post", function (req, res) {
    res.sendFile(__dirname + "/public/index.html");
})

app.get("/v1/posts", function (req, res) {
    res.send(Data);
});

app.get("/v2/posts", function (req,res) {
    Videos.find({}, function (err, data) {
        if (err) {
            res.send(err)
        } else {
            res.send(data)
        }
    })
})

app.post('/v2/posts', function (req, res) {
    const dbVideo = req.body;
    
    Videos.create(dbVideo, function (err, data) {
        if (!err) {
            res.send(data);
        } else {
            res.send(err);
        }
    });
});

//listen

var port = process.env.PORT;
if (port == null || port == '') {
    port = 5500;
}

app.listen(port, function () { 
    console.log('server running on Port', port);
});