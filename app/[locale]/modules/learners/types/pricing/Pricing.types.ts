/* eslint-disable no-unused-vars, @typescript-eslint/no-unused-vars */
import { ApiResponse2 } from '@/app/[locale]/shared/types';

export enum PackageType {
  MONTHLY = 'monthly',
  YEARLY = 'yearly',
  AFFILIATE = 'affiliate',
  MONTHLY_VI = 'monthly_vi',
  YEARLY_VI = 'yearly_vi',
}

export interface PackagePlan {
  name: string;
  description: string;
  price: number;
  discountPercentage: number;
  finalAmount: number;
  currency: string;
  value: string;
  subscription?: Subscription;
}

export interface Subscription {
  packagePlan: string;
  status: string;
  discountPercentage: number;
  amount: number;
  finalAmount: number;
  startDate: string;
  endDate: string;
}

export interface InitiateSubscriptionResponse extends ApiResponse2<unknown> {
  checkoutUrl: string;
}

export interface IGetPackagePlansResponse extends ApiResponse2<PackagePlan[]> {}
