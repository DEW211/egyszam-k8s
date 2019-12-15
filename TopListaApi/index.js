let express = require('express');
let bodyParser = require('body-parser');
const cors = require('cors');

let mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/RNALBI', {
	useNewUrlParser: true,
	useFindAndModify: false,
	useUnifiedTopology: true
});


var scoreSchema = new mongoose.Schema({
	name: String,
	score: Number
});
var Score = mongoose.model('Score', scoreSchema);

const getTopList = (req, res) => {
    Score.find({}).sort({score: 'desc'}).exec().then(list => {
        res.status(200).json(list);
    })
}

const app = express();
const port = process.env.port || 3001;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.get('/toplist', getTopList);

app.listen(port, () => console.log(`Example app listening on port ${port}!`))