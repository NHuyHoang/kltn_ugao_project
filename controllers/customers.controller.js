import services from '../services/customers.service';

export default {
    findAll: (req, res) => {
        services.findAll()
            .catch(err => res.sendStatus(404).send(err))
            .then(data => res.send(data));
    },
    findOne: (req, res) => {
        if (!req.params.id) res.send('id is required');
        services.findOne(req.params.id)
            .catch(err => res.sendStatus(404).send(err))
            .then(data => res.send(data));
    },
    insert: (req, res) => {
        if (!req.body) res.send('input not found');
        services.insert(req.body)
            .catch(err => res.sendStatus(404).send(err))
            .then(data => res.send(data));
    },
    update: (req, res) => {
        if (!req.body || !req.body.id) res.send('invalid input');
        services.update(req.body)
            .catch(err => res.sendStatus(404).send(err))
            .then(data => res.send(data));
    },
    remove: (req, res) => {
        if (!req.params.id) res.send('id is required');
        services.remove(req.params.id)
            .catch(err => res.sendStatus(404).send(err))
            .then(data => res.send(data));
    }
}