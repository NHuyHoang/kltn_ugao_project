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

app.use('/graphql', expressGraphQL({
    schema,
    graphiql: true
}))

app.listen(8000, () => {
    console.log('listening on port 8000');
});

/* import { Products, Reviews } from './models';
import { reviewsService,productsService } from './services';

reviewsService.findCustomerByReviewId('5aaa47136fa27337b0bc21a2')
    .then(data => console.log(data))
    .catch(err => console.log(err)) */

/* let rev1 = new Reviews({
    content: `Maecenas purus libero, sodales quis lobortis ac, sagittis quis lacus. Duis tincidunt vehicula ipsum a volutpat. Cras pulvinar, tortor vitae facilisis dapibus, neque quam malesuada massa, vel semper tortor ligula sit amet arcu. Ut ac felis nisl. Nullam magna augue, placerat sed tincidunt quis, mollis ac felis. Donec justo nulla, auctor vel mi sit amet, malesuada laoreet velit.`,
    customerId:'5aa7d8587e4f1342f85afd59',
    date_review: new Date()
})

let rev2 = new Reviews({
    content: `Semper tortor ligula sit amet arcu. Ut ac felis nisl. Nullam magna augue, placerat sed tincidunt quis, mollis ac felis. Donec justo nulla, auctor vel mi sit amet, malesuada laoreet velit.`,
    customerId:'5aa7d9f121b7e032a81e4ea0',
    date_review: new Date()
})

let product = new Products({
    name:'Semper tortor ligula',
    amount:10000,
    type:'sodales quis lobortis',
    description: 'auctor vel mi sit amet, malesuada laoreet velit.',
    img:'https://s3.amazonaws.com/uifaces/faces/twitter/scrapdnb/128.jpg',
    rating:4,
    reviews:[rev1,rev2]
})

product.save().then(data => console.log(data)).catch(err => console.log(err)) */

/* import { invoicesService } from './services';
invoicesService.findMany(["5aa935af0c7e801290fbb843","5aa935d5922e340c201c34cd"])
    .then(data => console.log(data))
    .catch(err => console.log(err))
 */

/* import { Shippers } from './models';

let ship  = new Shippers({
    name: "David Chen",
    phone: "+788936935993",
    address: "996 Stan Cove",
    email: "Wilford.Blanda@yahoo.com",
    pass: "1T60G9FXPVWAISLAWJ7B3AHT26IZ",
    img: "https://s3.amazonaws.com/uifaces/faces/twitter/designervzm/128.jpg",
    invoiceId: ["5aa935d5922e340c201c34cd"]
})

ship.save().then(data => console.log(data)).catch(err => console.log(err)) */