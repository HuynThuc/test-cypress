import { useEffect, useState } from 'react';
import secureLocalStorage from 'react-secure-storage';

import { UserInfo } from '../../modules/helenngolang/types';

export function useLoggedInUser(): UserInfo | null | undefined {
  const [loggedInUser, setLoggedInUser] = useState<UserInfo | null | undefined>(
    undefined,
  );

  useEffect(() => {
    const currUser = secureLocalStorage.getItem('UserInfo') as UserInfo;
    if (
      !currUser &&
      window.location.pathname !== '/signin' &&
      window.location.pathname !== '/'
    ) {
      // redirect('/');
    }

    setLoggedInUser(currUser);
  }, []);

  return loggedInUser;
}
