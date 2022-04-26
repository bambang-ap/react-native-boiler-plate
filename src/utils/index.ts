import {SoilTextureProps, Texture} from '@assets/data/plants';

export * from './plant-manager';

export const generate = (scores: number[]): [number, string, boolean] => {
	const result = eval(scores.map(y => y / (10 / scores.length)).join('+'));
	return result > 70
		? [result, 'Sesuai', true]
		: result >= 40
		? [result, 'Sesuai Bersyarat', true]
		: [result, 'Tidak Sesuai', false];
};

type Keys =
	| 'cOrg'
	| 'organic'
	| 'pH'
	| 'rainFall'
	| 'temp'
	| 'height'
	| 'soilMoisture'
	| 'soilTexture'
	| 'n'
	| 'p'
	| 'k';

export const calculateScore = (
	key: Keys,
	value: number,
	min: number | Texture[],
	max?: number | SoilTextureProps['qualitative'],
): [string, string, number, string] => {
	let recommend: string[];
	const [result, score, i]: [string, number, number] =
		value >= min && value <= (max ?? min)
			? ['Baik', 10, 2]
			: value > max
			? ['Lebih', 0, 1]
			: ['Kurang', 0, 0];

	switch (key) {
		case 'rainFall':
			recommend = [
				'Perhatikan irigasi',
				'Perhatikan irigasi',
				'Perhatikan irigasi',
			];
			return ['Curah Hujan', result, score, recommend[i]];
		case 'temp':
			recommend = ['Tanpa mulsa', 'Gunakan mulsa', 'Gunakan mulsa'];
			return ['Suhu', result, score, recommend[i]];
		case 'height':
			return ['Ketinggian', result, score, null];
		case 'soilTexture':
			const textureQualitative = min as Texture[];
			const qualitative = max as SoilTextureProps['qualitative'];
			const calcQualitative: number = eval(
				textureQualitative
					.map(v => {
						const f = 10 / textureQualitative.length;
						switch (v) {
							case 'debu':
								return qualitative[0] ? f : 0;
							case 'pasir':
								return qualitative[1] ? f : 0;
							case 'liat':
								return qualitative[2] ? f : 0;
							case 'lempung':
								return qualitative[3] ? f : 0;
							default:
								return 0;
						}
					})
					.join('+'),
			);

			const [textureLevel, recommendTexture] =
				calcQualitative >= 7
					? ['Baik', 'Cukup pupuk organik']
					: calcQualitative >= 3
					? ['Sedang', 'Cukup pupuk organik']
					: ['Kurang', 'Tambah pupuk organik'];

			return ['Tekstur Tanah', textureLevel, calcQualitative, recommendTexture];
		case 'soilMoisture':
			const additionalCondition =
				(score >= 10 && score <= 19) || (score >= 31 && score <= 70);
			recommend = [
				'Gunakan banyak mulsa',
				'Gunakan sedikit mulsa',
				'Tanpa mulsa',
			];
			if (additionalCondition)
				return ['Kelembaban Tanah', 'Sedang', 5, recommend[i]];
			return ['Kelembaban Tanah', result, score, recommend[i]];
		case 'organic':
			recommend = [
				'Banyak pupuk organik',
				'Cukup pupuk organik',
				'Sedikit pupuk organik',
			];
			return ['Bahan Organik', result, score, recommend[i]];
		case 'cOrg':
			return ['C-Org', result, score, null];
		case 'pH':
			const c =
				value >= 0 && value <= 6.5
					? 'Tambah Kapur'
					: value >= 7.6
					? 'Tambah Belerang'
					: null;
			return ['pH', result, score, c];
		default:
			return ['', '', 0, null];
	}
};
