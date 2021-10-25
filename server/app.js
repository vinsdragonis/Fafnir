import express, { static } from 'express';
import ejs from "ejs";
import { urlencoded } from 'body-parser';
import _ from 'lodash';

const app = express();

app.set('view engine', 'ejs');

app.use(urlencoded({ extended: true }));
app.use(static("public"));

app.listen(3000, function (req, res) {
    console.log('Server is listening on port 3000');
});
