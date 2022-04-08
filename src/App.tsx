import React from 'react';

import {Body, BoxSpace, Container, Input} from '@components';
import {TEXT_SIZES} from '@constants/sizes';
import {FONTS, TYPOGRAPHY} from '@constants/typography';

const App = () => {
	return (
		<Container>
			<Body>
				<Input
					title="jbshdkfnsdfh"
					autoFocus
					// renderLeftAccessory={() => <BoxSpace D />}
					// renderRightAccessory={() => <BoxSpace D />}
					placeholder="Placeholder"
				/>
			</Body>
		</Container>
	);
};

export default App;
