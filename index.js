const express = require('express');
const app = express();
const mongoose = require('mongoose');
const exercise = require('./routes/exercise');

mongoose.connect('mongodb://localhost/exercise-tracker', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.use(express.urlencoded({ extended: false }));
app.use('/api/exercise', exercise);

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Listening at port ${port}.`);
});