import React from 'react';
import './App.css';
import logo from './logo.svg';
import {Package, Status} from './package'
import {Label} from './label';
import {AppState} from './app-state';

export class App extends React.Component {
	labels: Label[] = [];
	packages: Package[] = [];
	BASE_API_URL = 'https://package-json-corp-ws.herokuapp.com'
	TOKEN = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2MDg0NzA5OTUsImV4cCI6MTY0MDAwNjk5NSwic3ViIjoic3VwZXJfdXNlciIsInJvbGUiOiJjb3VyaWVyIn0.G2M875J1mAmnuWlsNiaSQSKveTpFzLjWLUgTjV9RBgQ';

	fetchLabels() {
		const requestOptions = {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': this.TOKEN
			}
		};
		const link = this.BASE_API_URL + '/labels';
		fetch(link, requestOptions)
			.then((response) => response.json())
			.then((data) => {
				this.setState({
					labels: data._embedded.data,
					packages: this.state.packages,
					loadingPackages: this.state.loadingPackages,
					loadingLabels: false
				})
			})
	}

	fetchPackages() {
		const requestOptions = {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': this.TOKEN
			}
		};
		const link = this.BASE_API_URL + '/packages';
		fetch(link, requestOptions)
			.then((response) => response.json())
			.then((data) => {
				this.setState({
					labels: this.state.labels,
					packages: data._embedded.data,
					loadingPackages: false,
					loadingLabels: this.state.loadingLabels
				})
			})
	}

	sendLabelApi(id: string) {
		const requestOptions = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': this.TOKEN
			},
			body: JSON.stringify({
				labelId: id
			})
		};
		const link = this.BASE_API_URL + '/packages';
		fetch(link, requestOptions)
			.then((response) => response.json())
			.then(() => this.updateData())
	}

	changePackageStatusApi(id: string, status: Status) {
		const requestOptions = {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': this.TOKEN
			},
			body: JSON.stringify({
				status: status.toString()
			})
		};
		const link = this.BASE_API_URL + '/packages/' + id;
		fetch(link, requestOptions)
			.then((response) => response.json())
			.then(() => this.fetchPackages())
	}

	componentDidMount() {
		this.updateData();
	}

	updateData() {
		this.fetchPackages();
		this.fetchLabels();
	}

	setLoading(loadingLabels: boolean, loadingPackages: boolean) {
		this.setState({
			labels: this.state.labels,
			packages: this.state.packages,
			loadingLabels: loadingLabels,
			loadingPackages: loadingPackages
		})
	}

	changePackageStatus(id: string, status: Status) {
		this.setLoading(false, true);
		this.changePackageStatusApi(id, status);
	}

	sendLabel(id: string) {
		this.setLoading(true, true);
		this.sendLabelApi(id);
	}

	state: AppState = {
		labels: [],
		packages: [],
		loadingPackages: true,
		loadingLabels: true
	}

	render() {
		return (
			<div className="App">
				<div className="header">
					<div className="main-header">Package JSON Corp</div>
					<div className="header-second-row">Courier App</div>
				</div>
				<div className="lists">
					<div className="list labels-list">
						<div className="list-header">Labels</div>
						<div className="list-items">
							{this.state.loadingLabels && <div className="spinner"><img src={logo} className="App-logo" alt="logo" /></div>}
							{this.state.labels.map((label, idx) => {
								return (
									<div key={idx} className="list-item">
										<div>{label.id}</div>
										{label.sent === 'false' &&
                                        <button onClick={(e) => this.sendLabel(label.id)}>Send</button>}
									</div>
								)
							})}
						</div>
					</div>
					<div className="list">
						<div className="list-header">Packages</div>
						<div className="list-items">
							{this.state.loadingPackages && <div className="spinner"><img src={logo} className="App-logo" alt="logo" /></div>}
							{this.state.packages.map((pack, idx) => {
								return (
									<div key={idx} className="list-item">
										<div>{pack.id}</div>
										<div className="buttons">
											<button disabled={pack.status === Status.IN_TRANSIT} onClick={() => this.changePackageStatus(pack.id, Status.IN_TRANSIT)}>In Transit</button>
											<button disabled={pack.status === Status.DELIVERED} onClick={() => this.changePackageStatus(pack.id, Status.DELIVERED)}>Delivered</button>
											<button disabled={pack.status === Status.PICKED_UP} onClick={() => this.changePackageStatus(pack.id, Status.PICKED_UP)}>Picked Up</button>
										</div>
									</div>
								)
							})}
						</div>
					</div>
				</div>
				<div className="footer">Don't call us when You die<br/>even then, we won't let You down</div>
			</div>
		);
	}
}

export default App;
