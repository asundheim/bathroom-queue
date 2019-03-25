import cors = require('cors');
import express = require('express');
import { Person } from './person';
import { Queue } from './queue';

const app = express();
app.use(cors());
app.use(express.json());
const queue = new Queue();

app.post('/add/:name', (req, res) => {
    queue.add(new Person(req.params.name));
});

app.delete('/delete', (req, res) => {
    queue.remove();
});

app.get('/queue', (req, res) => {
    res.send({
        queue: queue.getQueue()
    });
});

app.listen(8081, () => {
    console.log('Listening on 8081');
    setTimeout(() => queue.cleanUp(), 5000);
});
