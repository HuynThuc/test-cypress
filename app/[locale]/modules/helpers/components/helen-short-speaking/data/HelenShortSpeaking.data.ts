import { ListOption } from '../../../../../shared/types';

export const helenShortSpeakingStatuses: ListOption[] = [
  {
    value: 'PENDING',
    title: 'Pending',
    color: '#FDEBEC',
    iconUrl: '',
  },
  {
    value: 'ACTIVE',
    title: 'Active',
    color: '#FBF3DB',
    iconUrl: '',
  },
  {
    value: 'INACTIVE',
    title: 'Inactive',
    color: '#F1F1EF',
    iconUrl: '',
  },
];

export const defaultHelenShortSpeakingStatus = helenShortSpeakingStatuses[0];

export const helenShortSpeakingTargetAudiences: ListOption[] = [
  {
    value: 'KIDS',
    title: 'Kids',
    color: '#EDF3EC',
    iconUrl: '',
  },
  {
    value: 'TEENAGERS',
    title: 'Teenagers',
    color: '#EDF3EC',
    iconUrl: '',
  },
  {
    value: 'ADULTS',
    title: 'Adults',
    color: '#FAEBDD',
    iconUrl: '',
  },
];

export const defaultHelenShortSpeakingTargetAudience = {
  label: 'Undefined',
  className: '#F1F1EF',
};

// == NOTION TAG COLOR PALETE ===========
// Grey: #F1F1EF
// Brown: #F4EEEE
// Orange: #FAEBDD
// Yellow: #FBF3DB
// Green: #EDF3EC
// Blue: #E7F3F8
// Purple: #F6F3F9
// Pink: #FAF1F5
// Red: #FDEBEC
