//Tipp api: kap egy post-t frontendből, és utána beírja azt adatbázisba
let express = require('express');
let mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

mongoose.connect('mongodb://mongo:27017/RNALBI', {
	useNewUrlParser: true,
	useUnifiedTopology: true
});

var db = mongoose.connection;
var schema = new mongoose.Schema({
	name: String,
	guess: Number
});
var Guess = mongoose.model('Guess', schema);
db.on('error', console.error.bind(console, 'connection error:'));
/* db.once('open', () => {
    
   
    var guess = new Guess({name: "Dávid", guess: 1});
    guess.save((err, guess) => {
        if(err)
            return console.error(err);
        console.log(guess);
    })
}) */
async function postGuess(req, res) {
	var guess = new Guess({ name: req.body.name, guess: req.body.guess });
	await guess
		.save();
		res.status(201).json({ msg: 'created' });
};

const app = express();
const port = process.env.port || 80;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.post('/guess', postGuess);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
