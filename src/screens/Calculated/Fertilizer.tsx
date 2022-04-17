import React, {Fragment, useState} from 'react';

import criteria from '@assets/data/criteria';
import {
	BoxSpace,
	Button,
	ButtonVariant,
	FlatList,
	Text,
	Wrapper,
} from '@components';
import {InputForm} from '@interfaces';

import {generateScores} from './';

type Props = {
	scores: ReturnType<typeof generateScores>['scoreObject'];
	plant: InputForm['plant'];
};

const numPercentage = (num: number, scores: number) => {
	const {fertilizerPercent} = criteria.find(({score}) => score === scores);
	return num * fertilizerPercent;
};

const Fertilizer = ({scores, plant}: Props) => {
	const [index, setIndex] = useState(0);

	const {N, P, K} = plant;
	const {
		Natrium: [, , Natrium],
		Fosfor: [, , Fosfor],
		Kalium: [, , Kalium],
	} = scores;
	const [N1, P1, K1] = [
		numPercentage(N, Natrium),
		numPercentage(P, Fosfor),
		numPercentage(K, Kalium),
	];

	const chemicalFertilizer = {
		Urea: (N1 / 45) * 100,
		'SP 36': (P1 / 36) * 100,
		KCL: (K1 / 60) * 100,
		'NPK 15-15-15': (P1 / 15) * 100,
		'NPK 16-16-16': (P1 / 16) * 100,
	};

	const organicFertilizer = {
		Bokashi: '10-20',
		'Kandang Sapi': ((N / 1.5) * 100) / 1000,
		'Kandang Ayam': ((N / 1) * 100) / 1000,
		'Kandang Kambing': ((N / 2) * 100) / 1000,
		'Kandang Babi': ((N / 0.5) * 100) / 1000,
	};

	const result = Object.entries({
		'Pupuk Kimia': Object.entries(chemicalFertilizer),
		'Pupuk Organik': Object.entries(organicFertilizer),
	});

	return (
		<>
			<Wrapper>
				{result.mmap(({item: [name], isLast}, i) => {
					const isSelected = i === index;
					const variant = isSelected
						? ButtonVariant.primary
						: ButtonVariant.light;

					return (
						<Fragment key={i.toString()}>
							<Button flx variant={variant} onPress={() => setIndex(i)}>
								{name.ucwords()}
							</Button>
							{!isLast && <BoxSpace B />}
						</Fragment>
					);
				})}
			</Wrapper>
			<BoxSpace B />
			{result[index][1].mmap(({item: [key, val], isLast}, i) => {
				const value = typeof val === 'number' ? val.toFixed(0) : val;
				return (
					<Fragment key={i.toString()}>
						<Wrapper>
							<Text>{key}</Text>
							<Text>{value}</Text>
						</Wrapper>
						{!isLast && <BoxSpace B />}
					</Fragment>
				);
			})}
		</>
	);
};

export default Fertilizer;
