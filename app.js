const express = require('express');
const bodyParser = require('body-parser');
const path_join = require('path').join;
const usersRoutes = require('./routes/user');
const speakerRoutes = require('./routes/speaker');
const multer = require('multer');

const passport = require('passport');
require('./config/passport');

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        const folder = req.url.split('/')[2];
        cb(null, './pictures/' + folder + '/');
    },
    filename: (req, file, cb) => {
        cb(null, new Date().getTime() + '-' + file.originalname);
    },
    fileFilter: (req, file, cb) => {
        if (file.mimeType === 'image/png' || file.mimeType === 'image/jpeg' || file.mimeType === 'image/jpg') {
            cb(null, true);
        } else {
            cb(null, false);
        }
    }
});

const app = express();
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());
app.use(multer({storage: fileStorage, limits: {fileSize: 1024 * 1024 * 3}}).single('image'));
app.use(express.static(path_join(__dirname, 'public')));
app.use('/pictures', express.static(path_join(__dirname, 'pictures')));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.setHeader('Access-Control-Allow-Methods',
        'GET, POST, DELETE, PUT');
    next();
});

app.use(express.static(path_join(__dirname, 'public')));
app.use('/pictures', express.static(path_join(__dirname, 'results')));

app.use(passport.initialize());

// Routes
app.use('/api/user', usersRoutes);
app.use('api/speaker', speakerRoutes);

console.log('Username:', process.env.CONF_MYSQL_USER);
console.log('Database:', process.env.CONF_MYSQL_DATABASE);


//Handle errors
app.use(function(err, req, res, next) {
    console.log(err);
    return res.status(err.status || 500).json({ error : JSON.stringify(err) });
});

module.exports = app;





