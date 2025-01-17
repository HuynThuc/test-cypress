import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { InferType, object, string } from 'yup';

import {
  INPUT_MAX_LENGTH_1000,
  INPUT_MAX_LENGTH_500,
  REQUIRED_INPUT_MSG,
} from '../../../shared/constants';
import { getErrorMessage, isError } from '../../../shared/utils';

const formSchema = object({
  title: string().required(REQUIRED_INPUT_MSG).max(1000, INPUT_MAX_LENGTH_1000),
  targetAudience: string().required(REQUIRED_INPUT_MSG),
  category: string().required(REQUIRED_INPUT_MSG),
  tags: string().required(REQUIRED_INPUT_MSG),
  youtubeUrl: string()
    .required(REQUIRED_INPUT_MSG)
    .max(500, INPUT_MAX_LENGTH_500),
  thumbnailUrl: string()
    .required(REQUIRED_INPUT_MSG)
    .max(1000, INPUT_MAX_LENGTH_1000),
  blurThumbnailUrl: string()
    .required(REQUIRED_INPUT_MSG)
    .max(1000, INPUT_MAX_LENGTH_1000),
  scriptUrl: string()
    .required(REQUIRED_INPUT_MSG)
    .max(1000, INPUT_MAX_LENGTH_1000),
  mode: string().required(REQUIRED_INPUT_MSG).max(1000, INPUT_MAX_LENGTH_1000),

  id: string().notRequired(),
});

export type HelenSpeakingSchema = InferType<typeof formSchema>;

export function useFormHelenSpeaking() {
  const form = useForm<HelenSpeakingSchema>({
    reValidateMode: 'onChange',
    mode: 'onSubmit',
    resolver: yupResolver(formSchema),
  });

  return {
    form,
    formSchema,
    isError: isError<HelenSpeakingSchema>(form),
    getErrorMessage: getErrorMessage<HelenSpeakingSchema>(form),
  };
}
