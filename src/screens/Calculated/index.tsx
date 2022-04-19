import React, {Fragment, useState} from 'react';
import {ScrollView} from 'react-native';

import Rainbow from '@indot/rainbowvis';
import {Plants} from 'components/app';

import criteria from '@assets/data/criteria';
import {
	Body,
	BoxSpace,
	Container,
	FlatList,
	Header,
	Text,
	Wrapper,
} from '@components';
import {COLORS} from '@constants/colors';
import {TYPOGRAPHY} from '@constants/typography';
import {useScreenProps} from '@hooks';
import {InputForm} from '@interfaces';
import {calculateScore, generate} from '@utils';

import Fertilizer from './Fertilizer';

type Element = 'Natrium' | 'Fosfor' | 'Kalium';
const ctx: Record<Element, [Element, string, number]> = {
	Kalium: [null, '', 0],
	Natrium: [null, '', 0],
	Fosfor: [null, '', 0],
};

const Calculated = () => {
	const [navigation, {params}] = useScreenProps('Calculated');
	const [plant, setPlant] = useState(params.plant);

	const {scoreObject, scoreArray: scores} = generateScores(params, plant);

	const [, resultTxt, showFertilizer] = generate(
		scores.map(([, , score]) => score),
	);

	return (
		<Container>
			<Header title={plant.name} onPressLeft={navigation.goBack} />
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
							const colours = [COLORS.PINK, COLORS.YELLOW, COLORS.GREEN];
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
					{showFertilizer && (
						<>
							<BoxSpace B />
							<Fertilizer scores={scoreObject} plant={plant} />
						</>
					)}
				</ScrollView>
			</Body>
		</Container>
	);
};

export default Calculated;

export const generateScores = (
	params: InputForm,
	plant: InputForm['plant'],
) => {
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

	return {
		scoreObject: {
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
		},
		get scoreArray() {
			return Object.values(this.scoreObject);
		},
	};
};
