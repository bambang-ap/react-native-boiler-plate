import React from 'react';

import {
	Body,
	BoxSpace,
	Button,
	ButtonVariant,
	Container,
	Input,
	Wrapper,
} from '@components';

const App = () => {
	return (
		<Container>
			<Body>
				<Input placeholder="Placeholder" />
				<BoxSpace B />
				<Button variant={ButtonVariant.primary}>jhsdkfsdf</Button>
				<Button variant={ButtonVariant.secondary}>jhsdkfsdf</Button>
				<Button variant={ButtonVariant.success}>jhsdkfsdf</Button>
				<Button variant={ButtonVariant.danger}>jhsdkfsdf</Button>
				<Button variant={ButtonVariant.warning}>jhsdkfsdf</Button>
				<Button variant={ButtonVariant.info}>jhsdkfsdf</Button>
				<Button variant={ButtonVariant.light}>jhsdkfsdf</Button>
				<Button variant={ButtonVariant.dark}>jhsdkfsdf</Button>
			</Body>
		</Container>
	);
};

export default App;
