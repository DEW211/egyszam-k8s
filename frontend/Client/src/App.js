import React from 'react';
import axios from 'axios';

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			name: '',
			guess: 0,
			toplist: []
		};

		this.handleChangeName = this.handleChangeName.bind(this);
		this.handleChangeGuess = this.handleChangeGuess.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChangeName(e) {
		this.setState({ name: e.target.value });
	}

	handleChangeGuess(e) {
		this.setState({ guess: e.target.value });
	}

	handleSubmit(e) {
		//küldés
		e.preventDefault();
		axios({
			method: 'post',
			url: '/guess',
			data: {
				name: this.state.name,
				guess: this.state.guess
			}
		}).then(response => {
			console.log(response);
			this.setState({
				name: '',
				guess: 0
			});
		});
	}

	componentDidMount() {
		axios.get('/toplist').then(response => {
			this.setState({ toplist: response.data });
		});
	}

	render() {
		let tableRows = [];
		for (let i = 0; i < this.state.toplist.length; i++) {
			tableRows.push(
				<tr>
					<th scope="row">{i}</th>
					<td>{this.state.toplist[i].name}</td>
					<td>{this.state.toplist[i].score}</td>
				</tr>
			);
		}
		return (
			<div className="d-flex flex-column h-100">
				<header>
					<nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
						<a className="navbar-brand" href="#">
							Egyszámjátek
						</a>
					</nav>
				</header>

				<main role="main" className="flex-shrink-0 mt-5">
					<div className="container">
						<div className="mt-5">
							<form onSubmit={this.handleSubmit}>
								<label>
									Name:
									<input
										type="text"
										value={this.state.name}
										onChange={this.handleChangeName}
									/>
								</label>
								<label>
									Guess:
									<input
										type="number"
										value={this.state.guess}
										onChange={this.handleChangeGuess}
									/>
								</label>
								<input type="submit" value="Submit" />
							</form>
						</div>
					</div>
					<div className="container">
						<div>Toplist</div>
						<table className="table">
							<thead>
								<tr>
									<th scope="col">#</th>
									<th scope="col">Name</th>
									<th scope="col">Score</th>
								</tr>
							</thead>
							<tbody>
								{tableRows}
							</tbody>
						</table>
					</div>
				</main>
			</div>
		);
	}
}

export default App;
