import React, {Fragment, useEffect, useState} from 'react';

import {
	Button,
	ButtonProps,
	ButtonVariant,
	FlatList,
	Icon,
	Separator,
	View,
	Wrapper,
} from '@components';
import {TYPOGRAPHY} from '@constants';
import {convertNumber} from '@utils';

const buttonTop = [
	['C', '÷', 'X', 'del'],
	['1', '2', '3', '-'],
	['4', '5', '6', '+'],
	['7', '8', '9', ','],
	['0', '00', '000', '='],
] as const;

const buttonBottom = [
	['7', '8', '9'],
	['0', '000', ','],
] as const;

const cash = ['1000', '2000', '5000', '10000', '20000', '50000', '100000'];

type BtnType =
	| '='
	| typeof buttonTop[number][number]
	| typeof buttonBottom[number][number];

type CalculatorProps = {
	doneText?: string | JSX.Element;
	onChange: (value: CalcValue) => void;
	onPressDone: (value: number) => void;
};

export type CalcValue = {
	left: string;
	right: string;
	hasSign: boolean;
	sign: '+' | '-' | 'X' | '÷';
};

export const Calculator = (props: CalculatorProps) => {
	const {onChange, onPressDone, doneText = 'Selesai'} = props;

	const [left, setLeft] = useState('');
	const [right, setRight] = useState('');
	const [sign, setSign] = useState('');

	const hasSign = sign.length > 0;

	const setState = hasSign ? setRight : setLeft;
	const state = hasSign ? right : left;

	const setCash = (value: string) => {
		setState(`${Number(state) + Number(value)}`);
	};

	const onPress = (btn: BtnType) => {
		const operator: BtnType[] = ['+', '-', 'X', '÷'];

		if (operator.includes(btn)) {
			if (hasSign) calculate(btn);
			else setSign(btn);
		} else if (btn === 'C') {
			setSign('');
			setLeft('');
			setRight('');
		} else if (btn === 'del') {
			if (state.length === 0) setSign('');
			else setState(state.slice(0, state.length - 1));
		} else if (btn === '=') {
			const value = calculate();
			onPressDone(value);
		} else {
			if (btn === ',') {
				if (state.includes('.')) return;
				else setState(`${state}.`);
			} else setState(`${state}${btn}`);
		}
	};

	const calculate = (btn?: BtnType) => {
		const value =
			sign === '+'
				? Number(left) + Number(right)
				: sign === '-'
				? Number(left) - Number(right)
				: sign === 'X'
				? Number(left) * Number(right)
				: sign === '÷'
				? Number(left) / Number(right)
				: Number(left);

		setRight('');
		setSign(btn ?? '');
		setLeft(value.toString());
		return value;
	};

	useEffect(() => {
		onChange({
			hasSign,
			left: left,
			right: right,
			sign: sign as '+' | '-' | 'X' | '÷',
		});
	}, [left, right, sign, hasSign]);

	return (
		<>
			<View>
				<Separator />
				<FlatList
					data={cash}
					numColumns={4}
					renderItem={({item, index}) => {
						const text = `+ ${convertNumber(item)}`;
						const isLast = index > 3;
						const isLastt = index > 0 && index % 3 === 0;

						return (
							<View flx>
								<Wrapper flx>
									<Btn
										onPress={() => setCash(item)}
										variantText={TYPOGRAPHY.tagline_3}>
										{text}
									</Btn>
									{!isLastt && <Separator />}
								</Wrapper>
								{!isLast && <Separator />}
							</View>
						);
					}}
				/>
			</View>
			<ButtonCalc onPress={onPress} buttons={buttonTop} doneText={doneText} />
			<Separator />
		</>
	);
};

const ButtonCalc = (props: {
	buttons: typeof buttonTop | typeof buttonBottom;
	onPress: (btn: BtnType) => void;
	doneText: CalculatorProps['doneText'];
}) => {
	const {buttons, onPress, doneText} = props;
	return (
		<>
			{buttons.map((item, index) => {
				return (
					<Fragment key={index.toString()}>
						<Separator />
						<Wrapper>
							{item.map((btn, i) => {
								const isLast = i === item.length - 1;
								const children =
									btn === 'del' ? (
										<Icon name="backspace" />
									) : btn === '=' ? (
										doneText
									) : (
										btn
									);

								return (
									<Fragment key={`${index}-${i}`}>
										<Btn onPress={() => onPress(btn)}>{children}</Btn>
										{!isLast && <Separator />}
									</Fragment>
								);
							})}
						</Wrapper>
					</Fragment>
				);
			})}
		</>
	);
};

const Btn = (props: ButtonProps) => (
	<Button
		flx
		style={{borderRadius: 0}}
		variant={ButtonVariant.light}
		{...props}
	/>
);
