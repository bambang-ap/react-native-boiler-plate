import React, {useState} from 'react';

import {Body, Container, Header, Text} from '@components';
import {Calculator, CalcValue} from '@components/app';
import {useScreenProps} from '@hooks';
import {AuthStackParamList} from '@navigators/Auth';
import {convertNumber} from '@utils';

const Cashout = () => {
	const [navigation] = useScreenProps<AuthStackParamList, 'Cashout'>();
	const [state, setState] = useState({left: '', right: ''} as CalcValue);

	const {hasSign, left, right, sign} = state;

	const total = '50000';

	const a = convertNumber(left);
	const b = convertNumber(hasSign ? right : left);
	const c = convertNumber(total);
	const cashReturn = convertNumber((Number(left) - Number(total)).toString());

	return (
		<Container>
			<Header title="Pembayaran" onPressLeft={navigation.goBack} />
			<Body>
				<Text alignCenter>Total yang harus dibayar</Text>
				<Text alignCenter>{c}</Text>
				<Text alignCenter>{b}</Text>
				<Text alignCenter>Kembalian {cashReturn}</Text>
				{hasSign && <Text alignCenter>{`${a} ${sign}`}</Text>}
			</Body>
			<Calculator onChange={setState} onPressDone={val => console.log(val)} />
		</Container>
	);
};

export default Cashout;
