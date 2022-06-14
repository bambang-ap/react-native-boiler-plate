import {atom} from 'recoil';

import {User} from '@interfaces';

export const atomUser = atom<User>({
	key: 'user',
	default: null,
});

export const atomAppReady = atom({
	key: 'appReady',
	default: false,
});
