import React, {Fragment, useState} from 'react';
import {ScrollView} from 'react-native';

import Rainbow from '@indot/rainbowvis';

import criteria from '@assets/data/criteria';
import {
	Body,
	BoxSpace,
	Container,
	FlatList,
	Header,
	Text,
	View,
	Wrapper,
} from '@components';
import {Plants} from '@components/app';
import {COLORS} from '@constants/colors';
import {SIZES} from '@constants/sizes';
import {TYPOGRAPHY} from '@constants/typography';
import {useScreenProps} from '@hooks';
import {InputForm} from '@interfaces';
import {calculateScore, generate} from '@utils';

import Fertilizer from './Fertilizer';

type Element = 'Nitrogen' | 'Fosfor' | 'Kalium';
const ctx: Record<Element, [string, string, number, [string, string]]> = {
	Nitrogen: ['Nitrogen', 'Sangat Rendah', 0, null],
	Fosfor: ['Fosfor', 'Sangat Rendah', 0, null],
	Kalium: ['Kalium', 'Sangat Rendah', 0, null],
};

const Calculated = () => {
	const [navigation, {params}] = useScreenProps('Calculated');
	const [plant, setPlant] = useState(params.plant);

	const {scoreObject, scoreArray: scores} = generateScores({...params, plant});

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
							const [name, level, valNum, recommend] = item;
							const colours = [COLORS.PINK, COLORS.YELLOW, COLORS.GREEN];
							const rainbow = new Rainbow({colours, min: 0, max: 10});

							const color = `#${rainbow.colorAt(valNum)}` as COLORS;

							const [left, right] = Array.isArray(recommend)
								? recommend
								: [, recommend];

							return (
								<Fragment>
									<Wrapper
										style={{padding: SIZES.padding, borderRadius: SIZES.radius}}
										backgroundColor={COLORS.BLACK12}
										itemsCenter>
										<View flx>
											<Text variant={TYPOGRAPHY.headline4}>{name}</Text>
											{left && (
												<>
													<BoxSpace />
													<Text>{left}</Text>
												</>
											)}
										</View>
										<BoxSpace />
										<View itemsEnd flx>
											<Text
												width="50%"
												alignCenter
												backgroundColor={color}
												color={COLORS.WHITE}>
												{level}
											</Text>
											{showFertilizer && right && (
												<>
													<BoxSpace />
													<Text alignRight>{`Rekomendasi : ${right}`}</Text>
												</>
											)}
										</View>
									</Wrapper>
									<BoxSpace B />
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

export const generateScores = (inputForm: InputForm) => {
	const {
		plant,
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
	} = inputForm;
	const calcCriteria = criteria.reduce((ret, item) => {
		const {
			K1,
			K2,
			N1,
			N2,
			P1,
			P2,
			name,
			score,
			nRecommend,
			pRecommend,
			kRecommend,
		} = item;
		if (n >= N1 && n <= N2)
			ret.Nitrogen = ['Nitrogen', name, score, nRecommend];
		if (p >= P1 && p <= P2) ret.Fosfor = ['Fosfor', name, score, pRecommend];
		if (k >= K1 && k <= K2) ret.Kalium = ['Kalium', name, score, kRecommend];
		return ret;
	}, ctx);

	const calcCOrg = calculateScore('cOrg', cOrg, plant.COrg);
	const calcBO = calculateScore('organic', organic, plant.organic);
	const calcPH = calculateScore('pH', pH, plant.phMin, plant.phMax);
	const calcCurah = calculateScore(
		'rainFall',
		rainFall,
		plant.rainFallMin,
		plant.rainFallMax,
	);
	const calcSuhu = calculateScore(
		'temp',
		temperature,
		plant.tempMin,
		plant.tempMax,
	);
	const calcKetinggian = calculateScore(
		'height',
		height,
		plant.heightMin,
		plant.heightMax,
	);
	const calcSoilMoisture = calculateScore('soilMoisture', soilMoisture, 20, 70);
	const calcQualitative = calculateScore(
		'soilTexture',
		0,
		plant.textureQualitative,
		qualitative,
	);
	return {
		scoreObject: {
			calcCurah,
			calcSuhu,
			calcKetinggian,
			calcQualitative,
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
