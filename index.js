import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import expressGraphQL from 'express-graphql'

import router from './routes/root.route';
import config from './config';
import schema from './schema/grapql.schema';
const PORT = process.env.PORT || 8000;
const app = express();

//fixing deploy
//update heroku please
mongoose.Promise = global.Promise;
mongoose.connect(config.db_uri)
    .then((err, client) => {
        console.log('Connected to db at ', config.db_uri);
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

/* import customers from './seeding/customer';
customers();  */

/* import bcrypt from 'bcryptjs';

var hash =  bcrypt.hashSync('huyhoang3562927', 10);

console.log(hash);

bcrypt.compare('huyhoang3562927', hash).then((res) => {
    console.log(res)
}); */

/* import { customersService } from './services';
customersService.findByEmailPass('bluegasus@gmail.com', 'huyhoang3562927')
    .then(result => console.log(result))
    .catch(result => console.log(result))
 */