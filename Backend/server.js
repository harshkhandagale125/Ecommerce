const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const routes = require('./route');
const cors = require('cors'); 

const cookieParser = require('cookie-parser');
const db = require('./db');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(cors());
app.use('/uploads', express.static('uploads'));



app.use(routes);

app.listen(port, () => {
    console.log('listening on port ' + port);
});
