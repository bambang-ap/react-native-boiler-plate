import 'global-methods';

import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {RecoilRoot} from 'recoil';
import RecoilNexus from 'recoil-nexus';

import RootNavigator from '@navigators';

const App = () => {
	return (
		<RecoilRoot>
			<RecoilNexus />
			<NavigationContainer>
				<RootNavigator />
			</NavigationContainer>
		</RecoilRoot>
	);
};

export default App;
