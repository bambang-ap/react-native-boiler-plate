import plants, {SoilTextureProps, Texture} from '@assets/data/plants';

export type InputForm = {
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
