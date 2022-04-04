const {
	compilerOptions: {baseUrl, paths},
} = require('./tsconfig.json');

const aliasesImports = Object.keys(paths).reduce((ret, pathKey) => {
	const regexEndStar = new RegExp(/\/\*$/);
	const regexFirstDot = new RegExp(/^\./);
	const key = pathKey.replace(regexEndStar, '');
	ret[key] = paths[pathKey].map(value => {
		const path = value.replace(regexEndStar, '').replace(regexFirstDot, '');
		return `${baseUrl}${path}`;
	});
	return ret;
}, {});

module.exports = {
	presets: ['module:metro-react-native-babel-preset'],
	plugins: [
		[
			'module-resolver',
			{
				root: [baseUrl],
				extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
				alias: Object.assign(
					{
						tests: ['./tests/'],
					},
					aliasesImports,
				),
			},
		],
	],
};
