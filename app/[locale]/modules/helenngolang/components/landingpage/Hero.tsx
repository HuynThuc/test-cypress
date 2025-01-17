import React from 'react';
import Image from 'next/image';

const Hero = () => {
  return (
    <div className="flex h-full p-4">
      <div className="ml-10 flex w-full flex-col justify-center">
        <div className="flex w-full items-center justify-between">
          <div className="flex flex-col gap-2">
            <p className="text-4xl font-extrabold text-black">
              AI-Powered Management
            </p>
            <p
              className="w-fit px-2 py-1 text-3xl font-bold text-black"
              style={{ backgroundColor: 'rgb(179, 232, 255)' }}
            >
              with Helen
            </p>
          </div>
        </div>
      </div>
      <div className="pt-20">
        <div
          className="h-full w-full rounded-2xl"
          style={{ backgroundColor: 'rgb(225, 250, 255)' }}
        >
          <div className="mx-auto w-fit pb-2 pt-16">
            <Image
              rel="preload"
              src="/images/rabito-english.ico"
              alt="Google logo"
              className="mx-auto"
              width={250}
              height={250}
              style={{
                maxWidth: '100%',
                height: 'auto',
                objectFit: 'cover',
              }}
              priority={true}
            />
          </div>
          <p className="mx-auto w-fit px-2 pb-3 text-3xl font-bold text-black">
            Helen
          </p>
        </div>
      </div>
    </div>
  );
};

export default Hero;
