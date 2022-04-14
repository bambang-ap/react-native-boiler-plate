import React, {useState} from 'react';
import {ScrollView} from 'react-native';

import Rainbow from '@indot/rainbowvis';

import criteria from '@assets/data/criteria';
import plants from '@assets/data/plants';
import {
	Body,
	BoxSpace,
	Button,
	ButtonVariant,
	Container,
	FlatList,
	Image,
	Text,
	View,
	Wrapper,
} from '@components';
import {COLORS} from '@constants/colors';
import {SIZES} from '@constants/sizes';
import {useScreenProps} from '@hooks';

const Calculated = () => {
	const [, {params}] = useScreenProps('Calculated');
	const [plant, setPlant] = useState(plants[0]);
	const {
		n,
		k,
		p,
		bahanOrganik: BO,
		cOrg,
		pH,
		curahHujan,
		suhu,
		ketinggian,
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
		bahanOrganik,
		phMax,
		phMin,
		curahMin,
		curahMax,
		suhuMin,
		suhuMax,
		ketinggianMin,
		ketinggianMax,
	} = plant ?? {};

	const calcCOrg = COrg === cOrg ? 'good' : cOrg > COrg ? 'more' : 'less';
	const calcBO =
		BO === bahanOrganik ? 'good' : BO > bahanOrganik ? 'more' : 'less';
	const calcPH =
		pH >= phMin && pH <= phMax ? 'good' : pH > phMax ? 'more' : 'less';
	const calcCurah =
		curahHujan >= curahMin && curahHujan <= curahMax
			? 'good'
			: curahHujan > curahMax
			? 'more'
			: 'less';
	const calcSuhu =
		suhu >= suhuMin && suhu <= suhuMax
			? 'good'
			: suhu > suhuMax
			? 'more'
			: 'less';
	const calcKetinggian =
		ketinggian >= ketinggianMin && ketinggian <= ketinggianMax
			? 'good'
			: ketinggian > ketinggianMax
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
					<View>
						<FlatList
							data={plants}
							numColumns={2}
							renderItem={({item}) => {
								const isSelected = item?.name === plant?.name;
								const variant = isSelected
									? ButtonVariant.primary
									: ButtonVariant.light;
								return (
									<>
										<Button
											flx
											key={item.name}
											variant={variant}
											onPress={() => setPlant(item)}
											style={{marginBottom: SIZES.padding}}
											textProps={{alignCenter: true}}>
											<View width="10%">
												<Image source={item.image} />
											</View>
											<BoxSpace />
											<Text color={isSelected ? COLORS.WHITE : COLORS.BLACK100}>
												{item.name}
											</Text>
										</Button>
										<BoxSpace />
									</>
								);
							}}
						/>
					</View>
					<BoxSpace B />
					{resultKey.mmap(({item: key}) => {
						const val = result[key];
						const colours = [COLORS.PINK, COLORS.YELLOW, COLORS.TURQUOISE];
						const [valNum, value] = generateScore(val);

						const rainbowMin = new Rainbow({colours, min: 0, max: 10});
						const rainbowMax = new Rainbow({colours, min: 0, max: 100});

						const colour = valNum > 10 ? rainbowMax : rainbowMin;
						const color = `#${colour.colourAt(valNum)}` as COLORS;

						return (
							<>
								<Wrapper>
									<Text>{key}</Text>
									<Text backgroundColor={color} color={COLORS.WHITE}>
										{` ${value} `}
									</Text>
								</Wrapper>
								<BoxSpace />
							</>
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
