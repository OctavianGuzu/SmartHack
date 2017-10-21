/**
 * Created by constantin.andreescu on 10/21/2017.
 */

const express = require('express');
const app = express();

var path = require('path');
var bodyParser = require('body-parser');

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));


app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
});
