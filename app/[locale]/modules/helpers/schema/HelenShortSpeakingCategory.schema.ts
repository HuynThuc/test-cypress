import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { InferType, object, string } from 'yup';

import {
  INPUT_MAX_LENGTH_100,
  INPUT_MAX_LENGTH_1000,
  REQUIRED_INPUT_MSG,
} from '../../../shared/constants';
import { getErrorMessage, isError } from '../../../shared/utils';

const formSchema = object({
  title: string().required(REQUIRED_INPUT_MSG).max(100, INPUT_MAX_LENGTH_100),
  value: string().required(REQUIRED_INPUT_MSG).max(100, INPUT_MAX_LENGTH_100),
  color: string().required(REQUIRED_INPUT_MSG).max(100, INPUT_MAX_LENGTH_100),
  iconUrl: string()
    .required(REQUIRED_INPUT_MSG)
    .max(1000, INPUT_MAX_LENGTH_1000),

  id: string().notRequired(),
});

export type HelenShortSpeakingCategorySchema = InferType<typeof formSchema>;

export function useFormHelenShortSpeakingCategory() {
  const form = useForm<HelenShortSpeakingCategorySchema>({
    reValidateMode: 'onChange',
    mode: 'onSubmit',
    resolver: yupResolver(formSchema),
  });

  return {
    form,
    formSchema,
    isError: isError<HelenShortSpeakingCategorySchema>(form),
    getErrorMessage: getErrorMessage<HelenShortSpeakingCategorySchema>(form),
  };
}
