import { ITitleLocale } from '@/app/[locale]/shared/types';

export interface IGameUnity {
  id: number;
  title: string;
  srcImg: string;
  description: ITitleLocale;
  isLocked: boolean;
}
