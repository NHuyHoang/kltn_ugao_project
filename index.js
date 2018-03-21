import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import expressGraphQL from 'express-graphql'

import router from './routes/root.route';
import config from './config';
import schema from './schema/grapql.schema'

const app = express();

mongoose.Promise = global.Promise;
mongoose.connect(config.local_db_uri)
    .then((err, client) => {
        console.log('Connected to db at ', config.local_db_uri);
        return mongoose.connection;
    })
    .catch(err => {
        console.log('Fail to connect at ' + err);
    });

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/', router);

app.use('/graphql', expressGraphQL({
    schema,
    graphiql: true
}))

app.listen(8000, () => {
    console.log('listening on port 8000');
});

/* import { Stores } from './models';
let store = new Stores({
    location: {
        address: '121 wellington',
        dest_lat: 123.34,
        dest_log: 49.12313333
    },
    name: "gao88",
    invoiceId: ['5aa935af0c7e801290fbb843', '5aa935d5922e340c201c34cd'],
    owner: {
        name: 'Jackie Mike',
        phone: '91923132323',
        email: 'jackie@gmail.com',
        pass: 'myNameIsMike',
    },
    storage: [
        {
            productId: "5aab64714b19a416d0a51498",
            amount: 500,
            receipt_date: new Date(),
        },
        {
            productId: "5aaa47136fa27337b0bc21a4",
            amount: 500,
            receipt_date: new Date()
        }

    ],
    shipperId: ["5aaa199c75bd46150c6de2bd","5aaa1a42add0883054b0ee1c"]
})

store.save().then(data => console.log('ok')).catch(err => console.log(err)) */