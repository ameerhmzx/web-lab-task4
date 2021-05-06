import express from 'express';
import logger from 'morgan';
import imageIndex from './routes/image.js';

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/image', imageIndex);

app.use(function (req, res, next) {
    res.status(404);
    res.end('not found');
});

export default app;
