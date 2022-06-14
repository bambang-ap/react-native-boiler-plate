import {btoa} from 'abab';
import Stein from 'stein-client';

import {User} from '@interfaces';

enum SheetNames {
	PLANTS = 'plants',
	CRITERIA = 'criteria',
	USER = 'users',
}

const api = new Stein('6269bca74906bb05373ed53f');

const ApiClient = {
	async login(username: string, pwd: string): LoginResponse {
		const password = btoa(pwd);
		const response = await api.get<User>(SheetNames.USER, {
			search: {username, password},
		});
		if (response.length > 0) return [true, response[0]];
		return [false];
	},
};

export default ApiClient;

type LoginResponse = Promise<[status: true, userData: User] | [status: false]>;
