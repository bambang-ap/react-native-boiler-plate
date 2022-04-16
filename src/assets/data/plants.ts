import images from '@assets/images';

export type SoilTextureProps = {
	quantitative: [debu: number, pasir: number, liat: number];
	qualitative: [debu: boolean, pasir: boolean, liat: boolean, lempung: boolean];
};

export type Texture = 'debu' | 'liat' | 'pasir' | 'lempung';

type PlantRequirement = {
	image: unknown;
	name: string;
	rainFallMin: number;
	rainFallMax: number;
	tempMin: number;
	tempMax: number;
	heightMin: number;
	heightMax: number;
	textureQualitative: Texture[];
	textureQuantitative: Record<Exclude<Texture, 'lempung'>, number>;
	organic: number;
	COrg: number;
	phMin: number;
	phMax: number;
	N: number;
	P: number;
	K: number;
};
const tomato: PlantRequirement = {
	image: images.tomato,
	name: 'Tomat',
	rainFallMin: 400,
	rainFallMax: 700,
	tempMin: 18,
	tempMax: 24,
	heightMin: 100,
	heightMax: 2000,
	textureQualitative: ['debu', 'pasir'],
	textureQuantitative: {debu: 30, liat: 30, pasir: 40},
	organic: 2,
	COrg: 1.2,
	phMin: 6,
	phMax: 7.5,
	N: 150,
	P: 200,
	K: 250,
};
const chili: PlantRequirement = {
	image: images.chili,
	name: 'Lombok',
	rainFallMin: 600,
	rainFallMax: 1200,
	tempMin: 21,
	tempMax: 27,
	heightMin: 1,
	heightMax: 2000,
	textureQualitative: ['lempung', 'debu'],
	textureQuantitative: {debu: 30, liat: 30, pasir: 40},
	organic: 1.3,
	COrg: 0.8,
	phMin: 6,
	phMax: 7.6,
	N: 170,
	P: 50,
	K: 100,
};
const beans: PlantRequirement = {
	image: images.beans,
	name: 'Buncis',
	rainFallMin: 350,
	rainFallMax: 600,
	tempMin: 12,
	tempMax: 24,
	heightMin: 100,
	heightMax: 1500,
	textureQualitative: ['lempung', 'pasir'],
	textureQuantitative: {debu: 30, liat: 30, pasir: 40},
	organic: 2,
	COrg: 1.2,
	phMin: 5.6,
	phMax: 7.5,
	N: 31,
	P: 2.5,
	K: 6.6,
};
const peanuts: PlantRequirement = {
	image: images.peanuts,
	name: 'Kacang tanah',
	rainFallMin: 450,
	rainFallMax: 1300,
	tempMin: 20,
	tempMax: 30,
	heightMin: 100,
	heightMax: 1500,
	textureQualitative: ['lempung', 'debu'],
	textureQuantitative: {debu: 30, liat: 30, pasir: 40},
	organic: 2,
	COrg: 1.2,
	phMin: 6,
	phMax: 7,
	N: 40,
	P: 45,
	K: 30,
};
const mungBean: PlantRequirement = {
	image: images.mungBean,
	name: 'Kacang hijau',
	rainFallMin: 450,
	rainFallMax: 1300,
	tempMin: 20,
	tempMax: 30,
	heightMin: 100,
	heightMax: 1500,
	textureQualitative: ['lempung', 'debu'],
	textureQuantitative: {debu: 30, liat: 30, pasir: 40},
	organic: 2,
	COrg: 1.2,
	phMin: 6,
	phMax: 7,
	N: 0,
	P: 60,
	K: 25,
};

const plants = [tomato, chili, beans, peanuts, mungBean];

export default plants;
