/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { useRouter } from 'next/navigation';

import { Button } from '../../../../shared/components/shacdn-ui/Button.components';
const Card = () => {
  const { push } = useRouter();
  const handleStartLearning = () => {
    // push singin page
    push('/learners/video');
  };
  const handleStartManagement = () => {
    // push singin page
    push('/helpers/helen-speaking');
  };
  return (
    <div className="flex items-center justify-center">
      <div className="inline-flex w-full ">
        <div className="w-1/2 p-10">
          <img
            alt=""
            className="object-cover h-1/2 pl-40"
            src="https://hdsd.tdtu.edu.vn/assets/media/download/StudentGraduation.png"
          />
          <div className="flex items-center justify-center">
            <Button
              onClick={() => handleStartLearning()}
              className="px-4 py-2 rounded-full
              bg-slate-100
              hover:bg-slate-100
              flex items-center gap-2
              text-slate-500
              shadow-[-5px_-5px_10px_rgba(255,_255,_255,_0.8),_5px_5px_10px_rgba(0,_0,_0,_0.25)]
              transition-all
              hover:shadow-[-1px_-1px_5px_rgba(255,_255,_255,_0.6),_1px_1px_5px_rgba(0,_0,_0,_0.3),inset_-2px_-2px_5px_rgba(255,_255,_255,_1),inset_2px_2px_4px_rgba(0,_0,_0,_0.3)]
              hover:text-violet-500"
            >
              <p>Start learning</p>
            </Button>
          </div>
          <h2 className="flex items-center justify-center pt-10 ">
            <p className="text-gray text-xs">
              If you are an Learners, please click here
            </p>
          </h2>
        </div>

        <div className="border "></div>

        <div className=" w-1/2 p-10">
          <img
            alt=""
            className="object-cover h-1/2 pl-40"
            src="https://hdsd.tdtu.edu.vn/assets/media/download/Lecturer.png"
          />
          <div className="flex items-center justify-center">
            <Button
              onClick={() => handleStartManagement()}
              className="px-4 py-2 rounded-full
              bg-slate-100
              hover:bg-slate-100
              flex items-center gap-2
              text-slate-500
              shadow-[-5px_-5px_10px_rgba(255,_255,_255,_0.8),_5px_5px_10px_rgba(0,_0,_0,_0.25)]
              transition-all
              hover:shadow-[-1px_-1px_5px_rgba(255,_255,_255,_0.6),_1px_1px_5px_rgba(0,_0,_0,_0.3),inset_-2px_-2px_5px_rgba(255,_255,_255,_1),inset_2px_2px_4px_rgba(0,_0,_0,_0.3)]
              hover:text-violet-500"
            >
              <p>Start management</p>
            </Button>
          </div>
          <h2 className="flex items-center justify-center pt-10">
            <p className="text-gray text-xs">
              If you are an admin, please click here
            </p>
          </h2>
        </div>
      </div>
    </div>
  );
};

export default Card;
