import {MMKV} from 'react-native-mmkv';

import {User} from '@interfaces';

const store = new MMKV();

const storage = {
	getUser(): User | null {
		const user = store.getString(STORAGE.USER);
		if (user) return JSON.parse(user);
		return null;
	},
	setUser(user: User) {
		store.set(STORAGE.USER, JSON.stringify(user));
	},
	removeUser() {
		store.delete(STORAGE.USER);
	},
};

export default storage;

export enum STORAGE {
	USER = 'user',
}
