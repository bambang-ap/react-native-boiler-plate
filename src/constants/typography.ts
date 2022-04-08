import {TEXT_SIZES} from '@constants/sizes';

export enum FONTS {
	BOLD = 'Roboto-Bold',
	MEDIUM = 'Roboto-Medium',
	REGULAR = 'Roboto-Regular',
}

const {MEDIUM, REGULAR} = FONTS;
const {
	t_body_1,
	t_body_2,
	t_body_3,
	t_body_4,
	t_caption_1,
	t_caption_2,
	t_headline_1,
	t_headline_2,
	t_headline_3,
	t_headline_4,
	t_headline_5,
	t_x_large,
} = TEXT_SIZES;

export const typographyStyle = (index?: TYPOGRAPHY) => {
	const listStyles = [
		[MEDIUM, t_headline_1],
		[MEDIUM, t_headline_2],
		[MEDIUM, t_headline_3],
		[MEDIUM, t_headline_4],
		[MEDIUM, t_headline_5],
		[MEDIUM, t_x_large],
		[REGULAR, t_body_1],
		[MEDIUM, t_body_1],
		[REGULAR, t_body_2],
		[MEDIUM, t_body_2],
		[REGULAR, t_body_3],
		[MEDIUM, t_body_3],
		[REGULAR, t_body_4],
		[MEDIUM, t_body_4],
		[REGULAR, t_caption_1],
		[REGULAR, t_caption_2],
		[MEDIUM, t_body_3],
		[MEDIUM, t_body_4],
		[MEDIUM, t_caption_1],
	] as const;
	const [fontFamily, fontSize] = listStyles[index ?? TYPOGRAPHY.body4];
	return {fontFamily, fontSize};
};

export enum TYPOGRAPHY {
	headline1,
	headline2,
	headline3,
	headline4,
	headline5,
	large_title,
	body1,
	body1_semi,
	body2,
	body2_semi,
	body3,
	body3_semi,
	body4,
	body4_semi,
	caption_1,
	caption_2,
	tagline_1,
	tagline_2,
	tagline_3,
}
