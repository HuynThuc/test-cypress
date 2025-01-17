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
  category: string().required(REQUIRED_INPUT_MSG),
  quote: string().required(REQUIRED_INPUT_MSG).max(1000, INPUT_MAX_LENGTH_1000),
  author: string().required(REQUIRED_INPUT_MSG).max(500, INPUT_MAX_LENGTH_500),
  id: string().notRequired(),
});

export type SystemQuoteSchema = InferType<typeof formSchema>;

export function useFormSystemQuote() {
  const form = useForm<SystemQuoteSchema>({
    reValidateMode: 'onChange',
    mode: 'onSubmit',
    resolver: yupResolver(formSchema),
  });

  return {
    form,
    formSchema,
    isError: isError<SystemQuoteSchema>(form),
    getErrorMessage: getErrorMessage<SystemQuoteSchema>(form),
  };
}
