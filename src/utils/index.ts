export const generate = (scores: number[]): [number, string, boolean] => {
	const result = eval(scores.map(y => y / (10 / scores.length)).join('+'));
	return result > 70
		? [result, 'Sesuai', true]
		: result >= 40
		? [result, 'Sesuai Bersyarat', true]
		: [result, 'Tidak Sesuai', false];
};

export const calculateScore = (
	name: string,
	value: number,
	min: number,
	max?: number,
): [string, string, number] => {
	return value >= min && value <= (max ?? min)
		? [name, 'Baik', 10]
		: value > max
		? [name, 'Lebih', 0]
		: [name, 'Kurang', 0];
};
