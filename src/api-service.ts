

export class ApiService {
	BASE_API_URL = 'https://package-json-corp-ws.herokuapp.com'

	login() {
		const requestOptions = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ title: 'React POST Request Example' })
		};
		const link = this.BASE_API_URL + '/labels';
		fetch(link, requestOptions)
			.then((response) => response.json())
			.then((data) => console.log('This is your data', data));
	}

	// fetchAllLabels() {
	// 	const link = this.BASE_API_URL + '/labels';
	// 	fetch(link)
	// 		.then((response) => response.json())
	// 		.then((data) => console.log('This is your data', data));
	// }

	// createLabel(labelData: LabelRequest): Observable<Label> {
	// 	const link = environment.BASE_API_URL + '/labels';
	// 	const options = {
	// 		withCredentials: true
	// 	};
	// 	const data = {
	// 		addressee: labelData.addressee,
	// 		POBoxId: labelData.POBoxId,
	// 		size: labelData.size
	// 	};
	// 	return this.http.post<any>(link, data, options);
	// }
	//
	// deleteLabel(id: string): Observable<any> {
	// 	const link = environment.BASE_API_URL + '/labels/' + id;
	// 	const options = {
	// 		withCredentials: true
	// 	};
	// 	return this.http.delete<any>(link, options);
	// }
}