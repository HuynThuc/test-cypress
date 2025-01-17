import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { InferType, object } from 'yup';

import { getErrorMessage, isError } from '../../../shared/utils';

const formSchema = object({});

export type HelperHistoryActionSchema = InferType<typeof formSchema>;

export function useFormHelperHistoryAction() {
  const form = useForm<HelperHistoryActionSchema>({
    reValidateMode: 'onChange',
    mode: 'onSubmit',
    resolver: yupResolver(formSchema),
  });

  return {
    form,
    formSchema,
    isError: isError<HelperHistoryActionSchema>(form),
    getErrorMessage: getErrorMessage<HelperHistoryActionSchema>(form),
  };
}
