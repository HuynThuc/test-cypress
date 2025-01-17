'use client';
import { Fragment } from 'react';
import { useDispatch } from 'react-redux';

import { ILanguageCountry } from '@/modules/learners/types';
import { fetchLanguagesSuccess } from '@/modules/learners/store/slice';

const SupportLanguages = ({
  children,
  languages,
}: {
  children: React.ReactNode;
  languages: ILanguageCountry[];
}) => {
  const dispatch = useDispatch();
  dispatch(fetchLanguagesSuccess(languages));
  return <Fragment>{children}</Fragment>;
};

export default SupportLanguages;
