const faker = require('faker');
const lorem = faker.lorem;
const words = lorem.words;
const sentence = lorem.sentence;
const sentences = lorem.sentences;
const productFile = require('./dummy/product.json');

import { Products } from '../models'

export default () => {
    return Products.insertMany(productItem())
                .then(result => console.log(result))
                .catch(err => console.log(err))
}

const productItem = () => {
    const result = [];
    productFile.forEach(item => {
        let resultItem = {
            name: item.name,
            type: words(),
            img: item.img,
            description: sentence(),
            info: sentences(),
            price: item.price,
            weight: item.weight,
        };
        result.push(resultItem);
    });
    return result;
}
