const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("./models/User.js"); 
const Book = require("./models/Books.js");  
const Booking = require("./models/Booking.js")
const cookieParser = require("cookie-parser");
const imageDownloader = require('image-downloader');
const {S3Client, PutObjectCommand} = require('@aws-sdk/client-s3');
const multer = require('multer');
const fs = require('fs');
const mime = require('mime-types'); 

require('dotenv').config();
const app = express();

const bcryptSalt = bcrypt.genSaltSync(10);  
const jwtSecret = 'bjshjb98734bkhbso8rbhjk87vhb';


app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static(__dirname+'/uploads'));
app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173',       
}));

mongoose.connect(process.env.MONGO_URL);

async function uploadToS3(path, originalFilename, mimetype) {
    const client = new S3Client({
      region: 'us-east-1',
      credentials: {
        accessKeyId: process.env.S3_ACCESS_KEY,
        secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
      },
    });
    const parts = originalFilename.split('.');
    const ext = parts[parts.length - 1];
    const newFilename = Date.now() + '.' + ext;
    await client.send(new PutObjectCommand({
      Bucket: bucket,
      Body: fs.readFileSync(path),
      Key: newFilename,
      ContentType: mimetype,
      ACL: 'public-read',
    }));
    return `https://${bucket}.s3.amazonaws.com/${newFilename}`;
}


function getUserDataFromReq(req) {
    return new Promise((resolve, reject) => {
      jwt.verify(req.cookies.token, jwtSecret, {}, async (err, userData) => {
        if (err) throw err;
        resolve(userData);
      });
    });
  }

app.get('/test', (req,res) => {
    res.json('test ok');
}); 

app.post('/register', async (req,res) => {
    const {name,email,password} = req.body;

    try{
        const userDoc = await User.create({
            name,
            email,
            password: bcrypt.hashSync(password, bcryptSalt),
        });
        res.json(userDoc);
    } catch (e) {
        res.status(422).json(e);
    }
});

app.post('/login', async (req,res) => {
    const {email,password} = req.body;
    const userDoc = await User.findOne({email});
    if (userDoc) {
        const passOk = bcrypt.compareSync(password, userDoc.password);
        if (passOk) {
            jwt.sign({
                email:userDoc.email, 
                id:userDoc._id, 
            }, jwtSecret, {}, (err,token) => {
                if (err) throw err;
                res.cookie('token', token).json(userDoc);
            });
        } else {
            res.status(422).json('pass not ok');
        }   
    } else {
        res.json('not found')
    }
});

app.get('/profile', (req,res) => {
    const {token} = req.cookies;
    if (token) {
        jwt.verify(token, jwtSecret, {}, async (err, userData) => {
            if (err) throw err;
            const {name,email,_id} = await User.findById(userData.id);
            res.json({name,email,_id});
        });
    } else {
        res.json(null);
    }
});

app.post('logout', (req,res) => {
    res.cookie('token', '').json(true);
});
 
app.post('/upload-by-link', async (req,res) => {
    const {link} = req.body;
    const newName = 'photo' + Date.now() + '.jpg';
    await imageDownloader.image({
        url: link,
        desk: __dirname +  '/uploads' +newName,
    });
    res.json(newName);
    const url = await uploadToS3('/tmp/' +newName, newName, mime.lookup('/tmp/' +newName));
    res.json(url);
});

const photosMiddleware = multer({dest:'uploads/'});
app.post('/upload', photosMiddleware.array('photos', 100), (req,res) => {
    const uploadedFiles = [];
    for (let i = 0; i < req.files.length; i++) {
        const {path, originalname} = req.files[i];
        const parts = originalname.split('.');
        const ext = parts[parts.length - 1];
        const newPath = path + '.' + ext;
        fs.renameSync(path, newPath);
        uploadedFiles.push(newPath.replace('uploads/',''));
    }
    res.json(uploadedFiles);
});

app.post('/Books', (req,res) => {
    const {token} = req.cookies;
    const {
        title,isbn,numberOfPages,addedPhotos,description,price,
        perks,extraInfo,secureCheckIn,secureCheckout
    } = req.body;
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
        if (err) throw err;
        const bookDoc = await Book.create({
            owner:userData.id,price,
            title,isbn,numberOfPages,photos:addedPhotos,description,
            perks,extraInfo,secureCheckIn,secureCheckout
        });
        res.json(bookDoc);
    });
}); 

app.get('/user-Books', (req,res) => {
    const {token} = req.cookies;
    jwt.verify(token, jwtSecret, {}, async(err, userData) => {
        const {id} = userData;
        res.json (await Book.find({owner:id}) );
    });
});

app.get('/books/:id', async (req,res) => {
    const {id} = req.params;
    res.json(await Book.findById(id));
});

app.put('/Books', async (req,res) => {
    const {token} = req.cookies;
    const {
        id, title,isbn,numberOfPages,addedPhotos,description,
        perks,extraInfo,secureCheckIn,secureCheckout, price,
    } = req.body;
    jwt.verify(token, jwtSecret, {}, async(err, userData) => {
        if (err) throw err;
        const bookDoc = await Book.findById(id); 
        if (userData.id === bookDoc.owner.toString()) {
            bookDoc.set({
                title,isbn,numberOfPages,photos:addedPhotos,description,
                perks,extraInfo,secureCheckIn,secureCheckout, price,
            });
            await bookDoc.save();
            res.json('ok');
        }
    });
});

app.get('/Books', async (req,res) => {
    res.json( await Book.find() );
});

app.post('/bookings', async (req, res) => {
    const userData = await getUserDataFromReq(req);
    const {
      book,checkIn,checkOut,numberOfBooks,name,phone,price,
    } = req.body;
    Booking.create({
      book,checkIn,checkOut,numberOfBooks,name,phone,price,
      user:userData.id,
    }).then((doc) => {
      res.json(doc);
    }).catch((err) => {
      throw err;
    });
});

app.get('/bookings', async (req,res) => {
    const userData = await getUserDataFromReq(req);
    res.json( await Booking.find({user:userData.id}).populate('book') );
});


app.listen(3002);