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

export type Texture = 'debu' | 'liat' | 'pasir' | 'lempung';

export type PlantRequirement = {
	id: string;
	image: string;
	name: string;
	rainFallMin: number;
	rainFallMax: number;
	tempMin: number;
	tempMax: number;
	heightMin: number;
	heightMax: number;
	texture: string[];
	organic: number;
	COrg: number;
	phMin: number;
	phMax: number;
	N: number;
	P: number;
	K: number;
};

export type Criteria = {
	id: string;
	N1: number;
	N2: number;
	P1: number;
	P2: number;
	K1: number;
	K2: number;
	name: string;
	score: number;
	fertilizerPercent: number;
	nRecommend: [string, string];
	pRecommend: [string, string];
	kRecommend: [string, string];
};

export type User = Record<
	'id' | 'username' | 'password' | 'image' | 'name',
	string
>;
