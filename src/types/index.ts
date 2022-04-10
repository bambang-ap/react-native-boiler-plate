import {Tekstur} from '@assets/data/plants';

export type InputForm = {
	curahHujan: number;
	suhu: number;
	ketinggian: number;
	teksturTanah: Tekstur[];
	n: number;
	p: number;
	k: number;
	bahanOrganik: number;
	cOrg: number;
	pH: number;
};
