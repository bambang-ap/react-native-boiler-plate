import {
	NavigationProp,
	RouteProp,
	useNavigation,
	useRoute,
} from '@react-navigation/core';

import {RootStackParamList} from '@navigators';
import {AuthStackParamList} from '@navigators/Auth';
import {UnAuthStackParamList} from '@navigators/UnAuth';

type Navigation<P extends StackParamLists> = NavigationProp<P>;
type ScreenPropsRet<P extends StackParamLists, S extends keyof P> = [
	navigation: Navigation<P>,
	route: RouteProp<P, S>,
];
type StackParamLists =
	| RootStackParamList
	| UnAuthStackParamList
	| AuthStackParamList;

export const useScreenProps = <
	P extends StackParamLists,
	S extends keyof P,
>(): ScreenPropsRet<P, S> => {
	const navigation = useNavigation<NavigationProp<P>>();
	const route = useRoute<RouteProp<P, S>>();

	return [navigation, route];
};
