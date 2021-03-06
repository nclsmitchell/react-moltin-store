const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const app = express();
const routes = require('./server/routes')(app);

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

const port = process.env.PORT || 4000;

app.listen(port, (error) => {
    if (error) {
        console.error(error);
    } else {
        console.info('Server started');
    }
});

app.use('/static', express.static(path.join(__dirname, '../build/static')));

app.get('*', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, '../build/index.html'));
});

module.exports = app;
