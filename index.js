import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

import router from './routes/root';
import config from './config';

const app = express();

mongoose.Promise = global.Promise;
mongoose.connect(config.local_db_uri)
    .then(() => {
        console.log('Connected to db at ', config.local_db_uri);
        return mongoose.connection;
    })
    .catch(err => {
        console.log('Fail to connect at ' + err);
    });
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/', router);


app.listen(8000, () => {
    console.log('listening on port 8000');
});
