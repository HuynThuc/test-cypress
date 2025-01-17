import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { InferType, object, string } from 'yup';

import {
  INPUT_MAX_LENGTH_1000,
  REQUIRED_INPUT_MSG,
} from '../../../shared/constants';
import { getErrorMessage, isError } from '../../../shared/utils';

const formSchema = object({
  title: string().required(REQUIRED_INPUT_MSG).max(1000, INPUT_MAX_LENGTH_1000),
  targetAudience: string().required(REQUIRED_INPUT_MSG),
  category: string().required(REQUIRED_INPUT_MSG),
  tags: string(),
  imageUrl: string()
    .required(REQUIRED_INPUT_MSG)
    .max(1000, INPUT_MAX_LENGTH_1000),
  scriptUrl: string()
    .required(REQUIRED_INPUT_MSG)
    .max(1000, INPUT_MAX_LENGTH_1000),
  mp3Url: string()
    .required(REQUIRED_INPUT_MSG)
    .max(1000, INPUT_MAX_LENGTH_1000),
  refUrl: string()
    .required(REQUIRED_INPUT_MSG)
    .max(1000, INPUT_MAX_LENGTH_1000),

  id: string().notRequired(),
});

export type HelenShortSpeakingSchema = InferType<typeof formSchema>;

export function useFormHelenShortSpeaking() {
  const form = useForm<HelenShortSpeakingSchema>({
    reValidateMode: 'onChange',
    mode: 'onSubmit',
    resolver: yupResolver(formSchema),
  });

  return {
    form,
    formSchema,
    isError: isError<HelenShortSpeakingSchema>(form),
    getErrorMessage: getErrorMessage<HelenShortSpeakingSchema>(form),
  };
}
