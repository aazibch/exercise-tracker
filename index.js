require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const exercise = require('./routes/exercise');

const databaseUri = process.env.MONGO_URI.replace(
    '<password>',
    process.env.MONGO_PASSWORD
).replace(
    '<dbname>',
    process.env.DB_NAME
);

mongoose.connect(databaseUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.use(express.urlencoded({ extended: false }));
app.use('/api/exercise', exercise);

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Listening at port ${port}.`);
});