import React from 'react';

import {useSetRecoilState} from 'recoil';

import {Button} from '@components';
import {atomUser} from '@recoils/atom';
import storage from '@utils/storage';

const LogoutButton = () => {
	const setUser = useSetRecoilState(atomUser);

	const doLogout = () => {
		setUser(null);
		storage.removeUser();
	};

	return <Button onPress={doLogout}>Logout</Button>;
};

export default LogoutButton;
