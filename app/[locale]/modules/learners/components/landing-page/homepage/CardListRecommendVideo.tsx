/* eslint-disable @next/next/no-img-element */

import { FaHeadphones } from 'react-icons/fa';

import { IRecommend } from '@/modules/learners/types/Recommend.types';

type IRecommendVideoProps = {
  data: IRecommend;
};
//
const CardListRecommendVideo = ({ data }: IRecommendVideoProps) => {
  return (
    <div
      className="cursor-pointer overflow-hidden duration-200 border border-transparent/55 hover:border-white rounded-lg"
      style={{
        width: '302px',
        height: '296px',
        background:
          'linear-gradient(180deg, rgba(21, 199, 245, 0.21) 0%, rgba(49, 149, 247, 0.21) 63%, rgba(115, 115, 115, 0.00) 100%)',
      }}
    >
      <button className="w-full">
        <div className="relative w-full h-48" style={{ height: '160px' }}>
          <img
            src={data.thumbnailUrl}
            alt={data.thumbnailUrl}
            className="w-full h-full object-cover"
          />
          <span className="absolute bottom-2 right-2 bg-black text-white text-sm px-2 py-1 rounded">
            <p>{data.duration}</p>
          </span>
        </div>
        <div className="m-2">
          <div className="text-left line-clamp-2 h-[48px] text-white font-semibold text-base">
            {data.title}
          </div>
          {/* <div className="border-t my-4 boder-grey-100"></div> */}
          <div className="flex justify-between text-sm  mt-6">
            <div className="text-white flex items-center gap-2">
              <FaHeadphones />
              <p>{data.totalViewed}</p>
            </div>

            <div
              className={`px-2 py-1 rounded-sm font-semibold text-xs ${
                data.cefrLevel === 'B1'
                  ? 'bg-yellow-500 text-white'
                  : data.cefrLevel === 'B2'
                    ? 'bg-orange-400 text-white'
                    : data.cefrLevel === 'C1'
                      ? 'bg-red-500 text-white'
                      : 'bg-green-600 text-white'
              }`}
            >
              {data.cefrLevel}
            </div>
          </div>
        </div>
      </button>
    </div>
  );
};

export default CardListRecommendVideo;
