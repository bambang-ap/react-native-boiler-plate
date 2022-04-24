type E = {
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

const veryLow: E = {
	name: 'Sangat Rendah',
	score: 0,
	N1: 0,
	N2: 0.09,
	P1: 0,
	P2: 9,
	K1: 0,
	K2: 9,
	fertilizerPercent: 1,
	nRecommend: ['Perhatikan tabel pupuk urea / NPK', 'Banyak urea / NPK'],
	pRecommend: ['Perhatikan tabel pupuk SP36 / NPK', 'Banyak SP36 / NPK'],
	kRecommend: ['Perhatikan tabel pupuk KCL / NPK', 'Banyak KCL / NPK'],
};

const low: E = {
	name: 'Rendah',
	score: 0,
	N1: 0.1,
	N2: 0.2,
	P1: 10,
	P2: 20,
	K1: 10,
	K2: 20,
	fertilizerPercent: 1,
	nRecommend: ['Perhatikan tabel pupuk urea / NPK', 'Banyak urea / NPK'],
	pRecommend: ['Perhatikan tabel pupuk SP36 / NPK', 'Banyak SP36 / NPK'],
	kRecommend: ['Perhatikan tabel pupuk KCL / NPK', 'Banyak KCL / NPK'],
};

const medium: E = {
	name: 'Sedang',
	score: 5,
	N1: 0.21,
	N2: 0.5,
	P1: 21,
	P2: 40,
	K1: 21,
	K2: 40,
	fertilizerPercent: 0.5,
	nRecommend: ['Perhatikan tabel pupuk urea / NPK', 'Cukup urea / NPK'],
	pRecommend: ['Perhatikan tabel pupuk SP36 / NPK', 'Cukup SP36 / NPK'],
	kRecommend: ['Perhatikan tabel pupuk KCL / NPK', 'Cukup KCL / NPK'],
};

const high: E = {
	name: 'Tinggi',
	score: 10,
	N1: 0.51,
	N2: 0.75,
	P1: 41,
	P2: 60,
	K1: 41,
	K2: 60,
	fertilizerPercent: 0.2,
	nRecommend: ['Perhatikan tabel pupuk urea / NPK', 'Sedikit urea / NPK'],
	pRecommend: ['Perhatikan tabel pupuk SP36 / NPK', 'Sedikit SP36 / NPK'],
	kRecommend: ['Perhatikan tabel pupuk KCL / NPK', 'Sedikit KCL / NPK'],
};

const veryHigh: E = {
	name: 'Sangat Tinggi',
	score: 10,
	N1: 0.751,
	N2: 1,
	P1: 61,
	P2: 100,
	K1: 61,
	K2: 100,
	fertilizerPercent: 0.2,
	nRecommend: ['Perhatikan tabel pupuk urea / NPK', 'Sedikit urea / NPK'],
	pRecommend: ['Perhatikan tabel pupuk SP36 / NPK', 'Sedikit SP36 / NPK'],
	kRecommend: ['Perhatikan tabel pupuk KCL / NPK', 'Sedikit KCL / NPK'],
};

const criteria = [veryLow, low, medium, high, veryHigh].reverse();

export default criteria;
