import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import expressGraphQL from 'express-graphql'

import router from './routes/root.route';
import config from './config';
import schema from './grapql.schema'

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

app.use('/graphql',expressGraphQL({
    schema,
    graphiql:true
}))

app.listen(8000, () => {
    console.log('listening on port 8000');
});

/* 
import { invoicesService } from './services';

invoicesService.findCustomerInvoices("5aa7d8587e4f1342f85afd59")
    .then(data => console.log(data))
    .catch(err => console.log(err)) */
