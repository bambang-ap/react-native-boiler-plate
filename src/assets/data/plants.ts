import images from '@assets/images';

export type SoilTextureProps = {
	quantitative: [debu: number, pasir: number, liat: number];
	qualitative: [debu: boolean, pasir: boolean, liat: boolean, lempung: boolean];
};

export type Texture = 'debu' | 'liat' | 'pasir' | 'lempung';
type E = {
	image: unknown;
	name: string;
	rainFallMin: number;
	rainFallMax: number;
	tempMin: number;
	tempMax: number;
	heightMin: number;
	heightMax: number;
	texture: Texture[];
	organic: number;
	COrg: number;
	phMin: number;
	phMax: number;
	N1: number;
	N2: number;
	P1: number;
	P2: number;
	K1: number;
	K2: number;
};
const tomato: E = {
	image: images.tomato,
	name: 'Tomat',
	rainFallMin: 400,
	rainFallMax: 700,
	tempMin: 18,
	tempMax: 24,
	heightMin: 100,
	heightMax: 2000,
	texture: ['debu', 'pasir'],
	organic: 2,
	COrg: 1.2,
	phMin: 6,
	phMax: 7.5,
	N1: 150,
	N2: 150,
	P1: 200,
	P2: 200,
	K1: 250,
	K2: 250,
};
const chili: E = {
	image: images.chili,
	name: 'Lombok',
	rainFallMin: 600,
	rainFallMax: 1200,
	tempMin: 21,
	tempMax: 27,
	heightMin: 1,
	heightMax: 2000,
	texture: ['lempung', 'debu'],
	organic: 1.3,
	COrg: 0.8,
	phMin: 6,
	phMax: 7.6,
	N1: 100,
	N2: 170,
	P1: 25,
	P2: 50,
	K1: 50,
	K2: 100,
};
const beans: E = {
	image: images.beans,
	name: 'Buncis',
	rainFallMin: 350,
	rainFallMax: 600,
	tempMin: 12,
	tempMax: 24,
	heightMin: 100,
	heightMax: 1500,
	texture: ['lempung', 'pasir'],
	organic: 2,
	COrg: 1.2,
	phMin: 5.6,
	phMax: 7.5,
	N1: 31,
	N2: 31,
	P1: 3.5,
	P2: 2.5,
	K1: 6.6,
	K2: 6.6,
};
const peanuts: E = {
	image: images.peanuts,
	name: 'Kacang tanah',
	rainFallMin: 450,
	rainFallMax: 1300,
	tempMin: 20,
	tempMax: 30,
	heightMin: 100,
	heightMax: 1500,
	texture: ['lempung', 'debu'],
	organic: 2,
	COrg: 1.2,
	phMin: 6,
	phMax: 7,
	N1: 40,
	N2: 40,
	P1: 45,
	P2: 45,
	K1: 30,
	K2: 30,
};
const mungBean: E = {
	image: images.mungBean,
	name: 'Kacang hijau',
	rainFallMin: 450,
	rainFallMax: 1300,
	tempMin: 20,
	tempMax: 30,
	heightMin: 100,
	heightMax: 1500,
	texture: ['lempung', 'debu'],
	organic: 2,
	COrg: 1.2,
	phMin: 6,
	phMax: 7,
	N1: 0,
	N2: 0,
	P1: 60,
	P2: 60,
	K1: 25,
	K2: 25,
};

const plants = [tomato, chili, beans, peanuts, mungBean];

export default plants;
