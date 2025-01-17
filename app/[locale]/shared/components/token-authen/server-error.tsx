import RefreshAccessToken from '@/shared/components/token-authen/refresh-access-token';

type Props = {
  code: unknown;
  error: unknown;
};

const ServerError = ({ code, error }: Props) => {
  if (code === 401 && error === 'Unauthorized') {
    return <RefreshAccessToken />;
  }
  return <div>{error as string}</div>;
};

export default ServerError;
