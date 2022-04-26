import {PermissionsAndroid} from 'react-native';

import {jsonToCSV, readString} from 'react-native-csv';
import fs from 'react-native-fs';
import {setRecoil} from 'recoil-nexus';

import plants, {PlantRequirement} from '@assets/data/plants';
import {atomPlants} from '@recoils/atom';

const {PERMISSIONS, requestMultiple} = PermissionsAndroid;
const {READ_EXTERNAL_STORAGE, WRITE_EXTERNAL_STORAGE} = PERMISSIONS;
const folder = `${fs.DownloadDirectoryPath}/sdae`;
const filenamePlants = `${folder}/plants.csv`;

export const plantManager = {
	async init() {
		await requestMultiple([READ_EXTERNAL_STORAGE, WRITE_EXTERNAL_STORAGE]);
		await fs.mkdir(folder);

		const existPlants = await fs.exists(filenamePlants);
		const valuePlants = jsonToCSV(plants);

		if (!existPlants) fs.writeFile(filenamePlants, valuePlants);
	},

	async read() {
		await this.init();
		const crit = readString(await fs.readFile(filenamePlants));
		// @ts-ignore
		const [col, ...rows]: string[][] = crit?.data ?? [];
		const result = rows.map(row => {
			const stringType = ['image', 'name', 'texture'];
			return col.reduce((ret, colName, i) => {
				const val = stringType.includes(colName)
					? row[i]
					: parseInt(row[i], 10);
				return {...ret, [colName]: val};
			}, {} as PlantRequirement);
		});
		return result;
	},
	async load() {
		const data = await this.read();
		setRecoil(atomPlants, data);
	},
};
