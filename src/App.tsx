import React from 'react';

import {View, Text, Wrapper, BoxSpace} from '@components';
import {COLORS} from '@constants/colors';

const App = () => {
	return (
		<View flx>
			<Wrapper>
				<Text backgroundColor={COLORS.danger} flx>
					hjsdkf
				</Text>
				<BoxSpace />
				<Text>hjsdkf</Text>
			</Wrapper>
			<Wrapper>
				<BoxSpace A />
				<BoxSpace B />
				<BoxSpace C />
				<BoxSpace D />
				<BoxSpace E />
				<BoxSpace F />
				<BoxSpace G />
			</Wrapper>
		</View>
	);
};

export default App;
