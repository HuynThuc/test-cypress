import { ApiResponse2 } from '@/shared/types';

export interface ICurrentStreak {
  periodNum: number;
  periodType: string; // "week", "month", etc.
}

export interface IStreakDetails {
  friday: IStreakDay;
  monday: IStreakDay;
  saturday: IStreakDay;
  sunday: IStreakDay;
  thursday: IStreakDay;
  tuesday: IStreakDay;
  wednesday: IStreakDay;
}
export interface IStreakDay {
  date: string;
  streak: boolean;
}

export interface IUserStreak {
  currentStreak: ICurrentStreak;
  totalDays: number;
  totalAudios: number;
  totalVideos: number;
  streakDetails: IStreakDetails;
}

export interface IGetStreakResponse extends ApiResponse2<IUserStreak> {}
