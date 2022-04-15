import React, {Fragment, useState} from 'react';
import {ScrollView} from 'react-native';

import Rainbow from '@indot/rainbowvis';
import {Plants} from 'components/app';

import criteria from '@assets/data/criteria';
import {Body, BoxSpace, Container, Text, Wrapper} from '@components';
import {COLORS} from '@constants/colors';
import {useScreenProps} from '@hooks';

const Calculated = () => {
	const [, {params}] = useScreenProps('Calculated');
	const [plant, setPlant] = useState(params.plant);
	const {
		n,
		k,
		p,
		organic: BO,
		cOrg,
		pH,
		rainFall,
		temperature,
		height,
	} = params;
	const npkTanah = {Kalium: 'veryLow', Natrium: 'veryLow', Fosfor: 'veryLow'};
	criteria.forEach(item => {
		const {K1, K2, N1, N2, P1, P2, name} = item;
		if (n >= N1 && n <= N2) npkTanah.Natrium = name;
		if (p >= P1 && p <= P2) npkTanah.Fosfor = name;
		if (k >= K1 && k <= K2) npkTanah.Kalium = name;
	});

	const {
		COrg,
		organic,
		phMax,
		phMin,
		rainFallMin,
		rainFallMax,
		tempMin,
		tempMax,
		heightMin,
		heightMax,
	} = plant ?? {};

	const calcCOrg = COrg === cOrg ? 'good' : cOrg > COrg ? 'more' : 'less';
	const calcBO = BO === organic ? 'good' : BO > organic ? 'more' : 'less';
	const calcPH =
		pH >= phMin && pH <= phMax ? 'good' : pH > phMax ? 'more' : 'less';
	const calcCurah =
		rainFall >= rainFallMin && rainFall <= rainFallMax
			? 'good'
			: rainFall > rainFallMax
			? 'more'
			: 'less';
	const calcSuhu =
		temperature >= tempMin && temperature <= tempMax
			? 'good'
			: temperature > tempMax
			? 'more'
			: 'less';
	const calcKetinggian =
		height >= heightMin && height <= heightMax
			? 'good'
			: height > heightMax
			? 'more'
			: 'less';

	const result = {
		'Curah Hujan': calcCurah,
		Suhu: calcSuhu,
		Ketinggian: calcKetinggian,
		...npkTanah,
		BO: calcBO,
		'C-Org': calcCOrg,
		pH: calcPH,
	};
	const resultKey = Object.keys(result);

	return (
		<Container>
			<Body>
				<ScrollView>
					<Plants onChange={setPlant} plant={plant} />
					<BoxSpace B />
					{resultKey.mmap(({item: key}) => {
						const val = result[key];
						const colours = [COLORS.PINK, COLORS.YELLOW, COLORS.TURQUOISE];
						const [valNum, value] = generateScore(val);

						const rainbowMin = new Rainbow({colours, min: 0, max: 10});
						const rainbowMax = new Rainbow({colours, min: 0, max: 100});

						const colorProcess = valNum > 10 ? rainbowMax : rainbowMin;
						const color = `#${colorProcess.colorAt(valNum)}` as COLORS;

						return (
							<Fragment key={key}>
								<Wrapper>
									<Text>{key}</Text>
									<Text backgroundColor={color} color={COLORS.WHITE}>
										{` ${value} `}
									</Text>
								</Wrapper>
								<BoxSpace />
							</Fragment>
						);
					})}
				</ScrollView>
			</Body>
		</Container>
	);
};

export default Calculated;

const generateScore = (val: string) => {
	const score =
		val === 'good'
			? [10, 'Baik']
			: val === 'less'
			? [0, 'Kurang']
			: val === 'more'
			? [0, 'Lebih']
			: val === 'veryLow'
			? [0, 'Sangat Rendah']
			: val === 'low'
			? [0, 'Rendah']
			: val === 'medium'
			? [5, 'Sedang']
			: val === 'high'
			? [10, 'Tinggi']
			: val === 'veryHigh'
			? [10, 'Sangat Tinggi']
			: [0, ''];

	return score as [number, string];
};
