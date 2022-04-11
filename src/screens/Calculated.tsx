import React, {useState} from 'react';

import criteria from '@assets/data/criteria';
import plants from '@assets/data/plants';
import {
	Body,
	BoxSpace,
	Button,
	ButtonVariant,
	Container,
	Text,
	Wrapper,
} from '@components';
import {COLORS} from '@constants/colors';
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
				<Wrapper>
					{plants.mmap(({item}) => {
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
									textProps={{alignCenter: true}}>
									{item.name}
								</Button>
								<BoxSpace />
							</>
						);
					})}
				</Wrapper>
				<BoxSpace B />
				{resultKey.mmap(({item: key}) => {
					const val = result[key];
					const [value, color] =
						val === 'good'
							? ['Baik', COLORS.TURQUOISE]
							: val === 'less'
							? ['Kurang', COLORS.YELLOW]
							: val === 'more'
							? ['Lebih', COLORS.PINK]
							: val === 'veryLow'
							? ['Sangat Rendah', COLORS.PINK75]
							: val === 'low'
							? ['Rendah', COLORS.PINK]
							: val === 'medium'
							? ['Sedang', COLORS.BLACK100]
							: val === 'high'
							? ['Tinggi', COLORS.TURQUOISE75]
							: val === 'veryHigh'
							? ['Sangat Tinggi', COLORS.TURQUOISE]
							: ['', COLORS.WHITE];
					return (
						<>
							<Wrapper>
								<Text>{key}</Text>
								<Text color={color}>{value}</Text>
							</Wrapper>
							<BoxSpace />
						</>
					);
				})}
			</Body>
		</Container>
	);
};

export default Calculated;
