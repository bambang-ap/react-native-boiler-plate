import {btoa} from 'abab';
import Stein from 'stein-client';

import {Criteria, PlantRequirement, User} from '@interfaces';

enum SheetNames {
	PLANTS = 'plants',
	CRITERIA = 'criteria',
	USER = 'users',
}

const api = new Stein('6269bca74906bb05373ed53f');

const ApiClient = {
	getPlants() {
		return api.getWithType<PlantRequirement[]>(SheetNames.PLANTS);
	},
	getCriteria() {
		return api.getWithType<Criteria[]>(SheetNames.CRITERIA);
	},
	inputPlant(plant: Omit<PlantRequirement, 'id'>) {
		const {texture, ...tanaman} = plant;
		return api.create([{id: uuid(), texture: texture.join(','), ...tanaman}]);
	},
	async register(user: Omit<User, 'id'>) {
		const {username, password} = user;
		const [usernameFound] = await ApiClient.login(username, password);
		if (usernameFound) return {updatedRange: false};
		api.setConfig({sheetName: SheetNames.USER});
		return api.create([{...user, password: btoa(password), id: uuid()}]);
	},
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
