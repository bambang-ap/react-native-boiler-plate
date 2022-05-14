import {atom} from 'recoil';

import plants from '@assets/data/plants';
import {User} from '@interfaces';

export const atomPlants = atom({
	key: 'plantList',
	default: plants,
});

export const atomUser = atom<User>({
	key: 'user',
	default: null,
});

export const atomAppReady = atom({
	key: 'appReady',
	default: false,
});
