import {
	NavigationProp,
	RouteProp,
	useNavigation,
	useRoute,
	ParamListBase,
} from '@react-navigation/core';

import {RootStackParamList} from '@navigators';
import {AuthStackParamList} from '@navigators/Auth';
import {UnAuthStackParamList} from '@navigators/UnAuth';

type A = RootStackParamList | UnAuthStackParamList | AuthStackParamList;

export type Navigation<F extends ParamListBase> = NavigationProp<F>;
export type Route<F extends ParamListBase> = RouteProp<F, keyof F>;

export const useScreenProps = <S extends A>(
	screenName: keyof S,
): [Navigation<S>, Route<S>, keyof S] => {
	const navigation = useNavigation<Navigation<S>>();
	const route = useRoute<Route<S>>();
	return [navigation, route, screenName];
};
