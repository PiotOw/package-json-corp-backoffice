import {Label} from './label';
import {Package} from './package';

export interface AppState {
	labels: Label[],
	packages: Package[],
	loadingLabels: boolean
	loadingPackages: boolean
}