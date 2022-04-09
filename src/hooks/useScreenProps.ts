import {
	NavigationProp,
	RouteProp,
	useNavigation,
	useRoute,
} from '@react-navigation/core';

import {RootStackParamList} from '@navigators';

export type Navigation = NavigationProp<RootStackParamList>;
export type Route<RouteName extends keyof RootStackParamList> = RouteProp<
	RootStackParamList,
	RouteName
>;

export const useScreenProps = <S extends keyof RootStackParamList>(
	screenName: S,
): [Navigation, Route<S>, S] => {
	const navigation = useNavigation<Navigation>();
	const route = useRoute<Route<S>>();
	return [navigation, route, screenName];
};
