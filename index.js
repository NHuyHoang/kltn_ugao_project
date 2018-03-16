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

/* import { customersService } from './services';

customersService.findCustomerByInvoiceId('5aa935af0c7e801290fbb843')
    .then(data => console.log(data))
    .catch(data => console.log(data)) */
/* import { Producers } from './models';

let producer = new Producers({
    name:"producer 2",
    address: "23 Duis suscipit str",
    phone: "(623)456-125",
    email: "producer2@gmail.com",
    descripttion: "Duis suscipit bibendum nisi. Curabitur luctus vel nisi sed pellentesque. Suspendisse interdum mauris a tempor luctus. Integer finibus sit amet ipsum ac sagittis. Pellentesque ac posuere diam. Ut commodo felis ut mi pulvinar, ullamcorper semper felis tempor. Nunc mattis imperdiet justo, rhoncus tempor nisl bibendum id. Donec euismod eu eros non laoreet. Nullam mollis bibendum lacus et auctor. Aenean augue libero, ullamcorper sit amet egestas at, ultricies quis est. ",
    img: [
        "https://beebom-redkapmedia.netdna-ssl.com/wp-content/uploads/2016/01/Reverse-Image-Search-Engines-Apps-And-Its-Uses-2016.jpg",
        "https://www.jqueryscript.net/images/Simplest-Responsive-jQuery-Image-Lightbox-Plugin-simple-lightbox.jpg"
    ],
    productId:[
        "5aaa47136fa27337b0bc21a4",
    ]
})

producer.save().then(data => console.log(data)) */