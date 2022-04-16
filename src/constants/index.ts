import plants from '@assets/data/plants';
import {InputForm} from '@interfaces';

export const INPUT_FORM: InputForm = {
	location: '',
	qualitative: [false, false, false, false],
	quantitative: [0, 0, 0],
	textureType: 'qualitative',
	plant: plants[0],
	rainFall: 300,
	temperature: 30,
	height: 300,
	n: 0.09,
	p: 10,
	k: 35,
	organic: 2,
	cOrg: 1,
	pH: 7,
	soilMoisture: 0,
};
