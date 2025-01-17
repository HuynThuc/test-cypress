import iconHelper from './iconHelper';
import { icons } from './icons';

export type IconName = keyof typeof icons;

export default iconHelper(icons);
