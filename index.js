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

app.listen(PORT, () => {
    console.log('listening on port ', PORT);
});

/*   import { storesService } from './services';

  storesService.findByOwnerId("5ac8d41fd9552734e8148e1b")
    .then(result => console.log(result))
    .catch(err => console.log(err)) */