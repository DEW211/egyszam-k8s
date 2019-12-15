let mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/RNALBI', {
	useNewUrlParser: true,
	useFindAndModify: false,
	useUnifiedTopology: true
});

var guessSchema = new mongoose.Schema({
	name: String,
	guess: Number
});
var scoreSchema = new mongoose.Schema({
	name: String,
	score: Number
});
var Guess = mongoose.model('Guess', guessSchema);
var Score = mongoose.model('Score', scoreSchema);

Guess.find({})
	.sort('guess')
	.exec()
	.then(guesses => {
		var winner = undefined;
		let qty = 1;
		guesses.forEach(guess => {
			if (winner === undefined) {
				winner = guess;
			} else {
				if (winner.guess === guess.guess) {
					qty++;
				} else if (qty > 1) {
					winner = guess;
					qty = 1;
				}
			}
		});
		

		Score.find({ name: winner.name })
			.exec()
			.then(res => {
				if (res.length === 0) {
					let newRes = new Score({ name: winner.name, score: 1 });
					newRes.save();
				} else {
					let points = res[0].score + 1;
					Score.findOneAndUpdate(
						{ name: res[0].name },
						{ score: points }
					).exec().then(res => {
                        
                    });
                }
                //dokumentumok törlése
                Guess.deleteMany({}, () =>{
                    mongoose.connection.close();
                })
            });
        
	});

//
