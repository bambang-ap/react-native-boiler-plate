import React, {Fragment, useState} from 'react';
import {ScrollView} from 'react-native';

import Rainbow from '@indot/rainbowvis';
import {Plants} from 'components/app';

import criteria from '@assets/data/criteria';
import {Body, BoxSpace, Container, FlatList, Text, Wrapper} from '@components';
import {COLORS} from '@constants/colors';
import {TYPOGRAPHY} from '@constants/typography';
import {useScreenProps} from '@hooks';

type Element = 'Natrium' | 'Fosfor' | 'Kalium';
const ctx: Record<Element, [Element, string, number]> = {
	Kalium: [null, '', 0],
	Natrium: [null, '', 0],
	Fosfor: [null, '', 0],
};

const Calculated = () => {
	const [, {params}] = useScreenProps('Calculated');
	const [plant, setPlant] = useState(params.plant);

	const {
		n,
		k,
		p,
		organic,
		cOrg,
		pH,
		rainFall,
		temperature,
		height,
		soilMoisture,
		qualitative,
		// textureType,
		// quantitative,
		// location,
	} = params;

	const calcCriteria = criteria.reduce((ret, item) => {
		const {K1, K2, N1, N2, P1, P2, name, score} = item;
		if (n >= N1 && n <= N2) ret.Natrium = ['Natrium', name, score];
		if (p >= P1 && p <= P2) ret.Fosfor = ['Fosfor', name, score];
		if (k >= K1 && k <= K2) ret.Kalium = ['Kalium', name, score];
		return ret;
	}, ctx);

	const calcCOrg = calculateScore('C-Org', cOrg, plant.COrg);
	const calcBO = calculateScore('Bahan Organik', organic, plant.organic);
	const calcPH = calculateScore('pH', pH, plant.phMin, plant.phMax);
	const calcCurah = calculateScore(
		'Curah Hujan',
		rainFall,
		plant.rainFallMin,
		plant.rainFallMax,
	);
	const calcSuhu = calculateScore(
		'Suhu',
		temperature,
		plant.tempMin,
		plant.tempMax,
	);
	const calcKetinggian = calculateScore(
		'Ketinggian',
		height,
		plant.heightMin,
		plant.heightMax,
	);
	const calcSoilMoisture: [string, string, number] =
		(soilMoisture >= 10 && soilMoisture <= 19) ||
		(soilMoisture >= 31 && soilMoisture <= 70)
			? ['Kelembaban Tanah', 'Sedang', 5]
			: calculateScore('Kelembaban Tanah', soilMoisture, 20, 70);

	const calcQualitative: number = eval(
		plant.textureQualitative
			.map(v => {
				const f = 10 / plant.textureQualitative.length;
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

	const textureLevel =
		calcQualitative >= 7 ? 'Baik' : calcQualitative >= 3 ? 'Sedang' : 'Kurang';

	const scores = Object.values({
		calcCurah,
		calcSuhu,
		calcKetinggian,
		calcQualitative: ['Tekstur Tanah', textureLevel, calcQualitative] as [
			string,
			string,
			number,
		],
		calcSoilMoisture,
		...calcCriteria,
		calcBO,
		calcCOrg,
		calcPH,
	});

	const [_resultScore, resultTxt] = generate(
		scores.map(([, , score]) => score),
	);

	return (
		<Container>
			<Body>
				<ScrollView>
					<Plants onChange={setPlant} plant={plant} />
					<BoxSpace B />
					<Text alignCenter variant={TYPOGRAPHY.headline1}>
						{resultTxt}
					</Text>
					<BoxSpace B />
					<FlatList
						data={scores}
						renderItem={({item}) => {
							const [name, level, valNum] = item;
							const colours = [COLORS.PINK, COLORS.YELLOW, COLORS.TURQUOISE];
							const rainbow = new Rainbow({colours, min: 0, max: 10});

							const color = `#${rainbow.colorAt(valNum)}` as COLORS;

							return (
								<Fragment>
									<Wrapper>
										<Text>{name}</Text>
										<Text
											backgroundColor={color}
											color={COLORS.WHITE}>{` ${level} `}</Text>
									</Wrapper>
									<BoxSpace />
								</Fragment>
							);
						}}
					/>
				</ScrollView>
			</Body>
		</Container>
	);
};

export default Calculated;

const generate = (scores: number[]): [number, string] => {
	/**
	 * 0	-	40	tidak cocok
	 * 41 - 70	sesuai bersyarat
	 * 70 >			sesuai
	 *
	 * 41	-	100	muncul rekomendasi pupuk
	 */

	const result = eval(scores.map(y => y / (10 / scores.length)).join('+'));
	return result > 70
		? [result, 'Sesuai']
		: result >= 40
		? [result, 'Sesuai Bersyarat']
		: [result, 'Tidak Sesuai'];
};

const calculateScore = (
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
