import React, {useEffect, useState} from 'react';

import {useArray} from 'global-methods/hooks';

import {SoilTextureProps} from '@assets/data/plants';
import {
	BoxSpace,
	Button,
	Slider,
	Text,
	Wrapper,
	ButtonVariant,
	View,
} from '@components';
import {InputForm} from '@interfaces';

const SoilTexture = (props: {onChange: (value: SoilTextureProps) => void}) => {
	const [type, setType] = useState<InputForm['textureType']>('qualitative');
	const [quantitative, {replace}] = useArray([0, 0, 0]);
	const [qualitative, {replace: replaceQualitative}] = useArray([
		false,
		false,
		false,
		false,
	]);

	const [debu, pasir, liat] = quantitative;

	const toggleQualitative = (i: number) => {
		replaceQualitative(i, !qualitative[i]);
	};

	const qualitativeVariant = (i: number) => {
		const variant = qualitative[i]
			? ButtonVariant.primary
			: ButtonVariant.light;
		return variant;
	};

	const setQuantitative = (i: number, val: number) => {
		const prev = quantitative.slice(0, i);
		const next = quantitative.slice(i + 1);
		const prevVal = [...prev, ...next].reduce((a, b) => a + b, 0);
		if (val + prevVal < 100) replace(i, val);
		else replace(i, 100 - prevVal);
	};

	const renderQualitative = type === 'qualitative' && (
		<>
			<Button
				flx
				variant={qualitativeVariant(0)}
				onPress={() => toggleQualitative(0)}>
				Pasir
			</Button>
			<BoxSpace />
			<Button
				flx
				variant={qualitativeVariant(1)}
				onPress={() => toggleQualitative(1)}>
				Debu
			</Button>
			<BoxSpace />
			<Button
				flx
				variant={qualitativeVariant(2)}
				onPress={() => toggleQualitative(2)}>
				Liat
			</Button>
			<BoxSpace />
			<Button
				flx
				variant={qualitativeVariant(3)}
				onPress={() => toggleQualitative(3)}>
				Lempung
			</Button>
		</>
	);

	const renderQuantitative = type === 'quantitative' && (
		<>
			<Slider
				step={0.1}
				title="Debu"
				value={debu}
				minMax={[0, 100]}
				onChange={value => setQuantitative(0, value)}
			/>
			<Slider
				step={0.1}
				title="Pasir"
				value={pasir}
				minMax={[0, 100]}
				onChange={value => setQuantitative(1, value)}
			/>
			<Slider
				step={0.1}
				title="Liat"
				value={liat}
				minMax={[0, 100]}
				onChange={value => setQuantitative(2, value)}
			/>
		</>
	);

	useEffect(() => {
		// @ts-ignore
		props.onChange({qualitative, quantitative, textureType: type});
	}, [type, qualitative, quantitative]);

	return (
		<>
			<Text>Tekstur tanah</Text>
			<BoxSpace />
			<Wrapper>
				{/* <View>
					<Button
						variant={
							type === 'qualitative'
								? ButtonVariant.primary
								: ButtonVariant.light
						}
						onPress={() => setType('qualitative')}>
						Kualitatif
					</Button>
					<BoxSpace />
					<Button
						variant={
							type === 'quantitative'
								? ButtonVariant.primary
								: ButtonVariant.light
						}
						onPress={() => setType('quantitative')}>
						Kuantitatif
					</Button>
				</View>
				<BoxSpace B /> */}
				<View flx>
					{renderQuantitative}
					<Wrapper>{renderQualitative}</Wrapper>
				</View>
			</Wrapper>
			<BoxSpace B />
		</>
	);
};

export default SoilTexture;
