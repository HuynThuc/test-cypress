import { useRouter } from 'next/navigation';
import secureLocalStorage from 'react-secure-storage';

function useLogoutUser() {
  const { push } = useRouter();

  const logoutUser = () => {
    secureLocalStorage.removeItem('UserInfo');

    push('/');
  };

  return { logoutUser };
}

export default useLogoutUser;
