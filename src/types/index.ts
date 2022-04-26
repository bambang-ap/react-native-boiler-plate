import plants, {SoilTextureProps} from '@assets/data/plants';

export type InputForm = {
	location: string;
	plant?: typeof plants[number];
	rainFall: number;
	temperature: number;
	height: number;
	textureType: 'qualitative' | 'quantitative';
	n: number;
	p: number;
	k: number;
	organic: number;
	cOrg: number;
	pH: number;
	soilMoisture: number;
} & SoilTextureProps;
