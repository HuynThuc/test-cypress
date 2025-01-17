import * as React from 'react';
import Image from 'next/image';

import { Card } from '@/app/[locale]/shared/components/shacdn-ui/Card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/app/[locale]/shared/components/shacdn-ui/Carousel';

const SlideShow = () => {
  const images = [
    '/images/img3.jpg',
    '/images/img4.jpg',
    '/images/img5.jpg',
    '/images/img6.jpg',
  ];
  // const [api, setApi] = React.useState<CarouselApi>();
  // // const [current, setCurrent] = React.useState(0);

  // React.useEffect(() => {
  //   if (!api) {
  //     return;
  //   }
  //   // setCurrent(api.selectedScrollSnap() + 1);
  //   api.on('select', () => {
  //     setCurrent(api.selectedScrollSnap() + 1);
  //   });
  // }, [api]);
  return (
    <div className="relative px-4 mx-auto ">
      <Carousel
        className="max-w-[1023px]"
        opts={{
          loop: true,
          duration: 0,
        }}
        // setApi={setApi}
      >
        <CarouselContent>
          {images.map((image, index) => (
            <CarouselItem key={index}>
              <Card className="border-transparent">
                <div className="w-[1000px] h-[500px] overflow-hidden rounded-2xl">
                  <Image
                    rel="preload"
                    key={index}
                    src={image}
                    width={1000}
                    height={1000}
                    alt={`Slide ${index + 1}`}
                  />
                </div>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious className="hover:bg-transparent hover:text-white" />
        <CarouselNext className="hover:bg-transparent hover:text-white" />
      </Carousel>
      {/* <div className="absolute bottom-0 flex justify-center right-0 left-0 gap-2">
        {images.map((_, index) => (
          <div
            key={index}
            onClick={() => setCurrent(index)}
            className={`
        transition-all w-3 h-3 bg-white rounded-full
        ${current === index ? 'px-4 py-[0.5px]' : 'bg-opacity-50'}
      `}
          />
        ))}
      </div> */}
    </div>
  );
};

export default SlideShow;
