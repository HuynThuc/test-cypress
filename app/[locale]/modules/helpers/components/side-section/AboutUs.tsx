import router from 'next/router';
import React from 'react';

const AboutUsComponent = () => {
  const handleOnClick = () => {
    router.push(`/about-us`);
  };

  return (
    <>
      <div className="h-20 cursor-pointer gap-1 pt-4" onClick={handleOnClick}>
        <h1 className="px-2 pb-2">About GDD and contact</h1>
      </div>
    </>
  );
};

export default AboutUsComponent;
