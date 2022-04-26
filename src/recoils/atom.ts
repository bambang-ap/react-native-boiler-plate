import {atom} from 'recoil';

import plants from '@assets/data/plants';

export const atomPlants = atom({
	key: 'plantList',
	default: plants,
});
