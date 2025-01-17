import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { MdLogin } from 'react-icons/md';
import secureLocalStorage from 'react-secure-storage';
import { LogOut } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { useLoggedInUser } from '@/app/[locale]/shared/hook/GetLoggedInUser';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/app/[locale]/shared/components/shacdn-ui';
const Signin = () => {
  const t = useTranslations('Home');
  const loggedInUser = useLoggedInUser();
  const { push } = useRouter();
  const handleSignOut = () => {
    secureLocalStorage.removeItem('UserInfo');
    // reload page
    window.location.reload();
  };

  const handleSignIn = () => {
    push('/signin');
  };

  if (loggedInUser === undefined) {
    return <span>Loading</span>;
  }

  return (
    <div className="flex justify-center items-center pr-8">
      <div className="relative">
        {loggedInUser != null ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar>
                <AvatarImage
                  src="https://yt3.googleusercontent.com/oN0p3-PD3HUzn2KbMm4fVhvRrKtJhodGlwocI184BBSpybcQIphSeh3Z0i7WBgTq7e12yKxb=s900-c-k-c0x00ffffff-no-rj"
                  alt="@shadcn"
                  className="relative"
                />
                <AvatarFallback>RABITO</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              className="w-64 border-transparent"
              style={{
                background:
                  'linear-gradient(166.03deg, #353535 11.75%, #282828 78.31%)',

                boxShadow: '4px 6px 10px rgba(70, 160, 248, 0.24)',

                transform: 'translateX(-30%)',
              }}
            >
              <DropdownMenuLabel className=" text-white">
                My Course
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup className="text-white">
                <DropdownMenuItem>
                  <div className="flex px-4 gap-4">
                    <Image
                      rel="preload"
                      src={'/images/hinh1.svg'}
                      alt="Rabito English"
                      width={20}
                      height={20}
                    />
                    <span>Library</span>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <div className="flex px-4 gap-4">
                    <Image
                      rel="preload"
                      src={'/images/hinh2.svg'}
                      alt="Rabito English"
                      width={20}
                      height={20}
                    />
                    <span>History</span>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <div className="flex px-4 gap-4">
                    <Image
                      rel="preload"
                      src={'/images/hinh3.svg'}
                      alt="Rabito English"
                      width={20}
                      height={20}
                    />
                    <span>Watch Later</span>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <div className="flex px-4 gap-4">
                    <Image
                      rel="preload"
                      src={'/images/hinh4.svg'}
                      alt="Rabito English"
                      width={20}
                      height={20}
                    />
                    <span>My Learning Progress</span>
                  </div>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <div
                  className="flex items-center px-4 gap-4 text-white"
                  onClick={() => handleSignOut()}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <button onClick={handleSignIn} className="relative">
            <div
              className="px-4 py-2 gap-2 flex items-center text-white rounded-md"
              style={{
                background:
                  'linear-gradient(93deg, rgb(66, 0, 128), rgb(58, 32, 86) 100%)',
              }}
            >
              <MdLogin size={20} />
              {t('signIn')}
            </div>
          </button>
        )}
      </div>
    </div>
  );
};

export default Signin;
