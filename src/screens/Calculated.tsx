import React from 'react';

import criteria from '@assets/data/criteria';
import plants from '@assets/data/plants';
import {Body, Container, Text} from '@components';
import {useScreenProps} from '@hooks';

const Calculated = () => {
	const [, {params}] = useScreenProps('Calculated');
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
	const npkTanah = {K: 'veryLow', N: 'veryLow', P: 'veryLow'};
	criteria.forEach(item => {
		const {K1, K2, N1, N2, P1, P2, name} = item;
		if (n >= N1 && n <= N2) npkTanah.N = name;
		if (p >= P1 && p <= P2) npkTanah.P = name;
		if (k >= K1 && k <= K2) npkTanah.K = name;
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
	} = plants[0];

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
		...npkTanah,
		calcCOrg,
		calcBO,
		calcPH,
		calcCurah,
		calcSuhu,
		calcKetinggian,
	};

	return (
		<Container>
			<Body>
				<Text>{prettyJSON(result)}</Text>
			</Body>
		</Container>
	);
};

export default Calculated;
