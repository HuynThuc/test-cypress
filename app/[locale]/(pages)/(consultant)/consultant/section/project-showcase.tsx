'use client';
import { useCallback, useEffect, useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

import { cn, LanguageToStringLocale } from '@/shared/utils';
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/shared/components/shacdn-ui/Carousel';
import { useGetCurrentLocale } from '@/shared/hook';

import { CardStack } from '../components/card-stack';

interface Testimonial {
  clientName: string;
  consultationDetails: string;
  avatar: string;
  quote: {
    en: string;
    ja: string;
    vi: string;
  };
}

interface LocationData {
  testimonial: Testimonial;
  images: string[];
}

const locationData: Record<string, LocationData> = {
  US: {
    testimonial: {
      clientName: 'David Anderson',
      consultationDetails: 'Founder & CEO, TechFlow Solutions',
      avatar: '/placeholder.svg?height=40&width=40',
      quote: {
        en: "Traditional language schools weren't meeting our corporate needs. Through RabitoEng, we found dedicated instructors who understood our technical context and delivered results.",
        ja: '従来の語学学校は私たちの企業ニーズを満たしていませんでした。RabitoEngを通じて、私たちの技術的な文脈を理解し、結果を出してくれる専任の講師を見つけることができました。',
        vi: 'Các trường dạy ngôn ngữ truyền thống không đáp ứng được nhu cầu doanh nghiệp của chúng tôi. Thông qua RabitoEng, chúng tôi đã tìm được những giảng viên tận tâm, hiểu được bối cảnh kỹ thuật của chúng tôi và mang lại kết quả.',
      },
    },
    images: [
      'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=80&w=2069&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=2069&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=2069&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1497215842964-222b430dc094?q=80&w=2069&auto=format&fit=crop',
    ],
  },
  JP: {
    testimonial: {
      clientName: 'Akira Washiya',
      consultationDetails: 'Founder and CEO, Sukima Shopping',
      avatar: '/placeholder.svg?height=40&width=40',
      quote: {
        en: "Freelancers didn't work for us, we needed commitment. Through Qlay, we were able to find full-time committed engineers aligned with our vision, and this is what matters.",
        ja: 'フリーランサーは私たちには合いませんでした。私たちには献身的な人材が必要でした。Qlayを通じて、私たちのビジョンに沿った専任のエンジニアを見つけることができました。これこそが重要なのです。',
        vi: 'Freelancer không phù hợp với chúng tôi, chúng tôi cần sự cam kết. Thông qua Qlay, chúng tôi đã có thể tìm được những kỹ sư toàn thời gian tận tâm, phù hợp với tầm nhìn của chúng tôi, và đó mới là điều quan trọng.',
      },
    },
    images: [
      'https://images.unsplash.com/photo-1542051841857-5f90071e7989?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1524413840807-0c3cb6fa808d?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1536964549204-cce9eab227bd?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1493780474015-ba834fd0ce2f?q=80&w=2070&auto=format&fit=crop',
    ],
  },
  VN: {
    testimonial: {
      clientName: 'Helen Võ',
      consultationDetails: 'Director of Global Operations, InnovateCorp',
      avatar: '/placeholder.svg?height=40&width=40',
      quote: {
        en: 'RabitoEng transformed our international team communication. Their specialized English training programs helped bridge cultural gaps and boost productivity.',
        ja: 'RabitoEngは私たちの国際チームのコミュニケーションを変革しました。彼らの専門的な英語トレーニングプログラムは、文化的なギャップを埋め、生産性を向上させるのに役立ちました。',
        vi: 'RabitoEng đã chuyển đổi giao tiếp của đội ngũ quốc tế của chúng tôi. Các chương trình đào tạo tiếng Anh chuyên biệt của họ đã giúp thu hẹp khoảng cách văn hóa và tăng năng suất.',
      },
    },
    images: [
      'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1559523161-0fc0d8b38a7a?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1556761175-4b46a572b786?q=80&w=2070&auto=format&fit=crop',
    ],
  },
  default: {
    testimonial: {
      clientName: 'Sarah Chen',
      consultationDetails: 'Director of Global Operations, InnovateCorp',
      avatar: '/placeholder.svg?height=40&width=40',
      quote: {
        en: 'RabitoEng transformed our international team communication. Their specialized English training programs helped bridge cultural gaps and boost productivity.',
        ja: 'RabitoEngは私たちの国際チームのコミュニケーションを変革しました。彼らの専門的な英語トレーニングプログラムは、文化的なギャップを埋め、生産性を向上させるのに役立ちました。',
        vi: 'RabitoEng đã chuyển đổi giao tiếp của đội ngũ quốc tế của chúng tôi. Các chương trình đào tạo tiếng Anh chuyên biệt của họ đã giúp thu hẹp khoảng cách văn hóa và tăng năng suất.',
      },
    },
    images: [
      'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1559523161-0fc0d8b38a7a?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1556761175-4b46a572b786?q=80&w=2070&auto=format&fit=crop',
    ],
  },
};

const createCardStackItems = (testimonials: Testimonial[], locale: string) => {
  return testimonials.map((testimonial, index) => ({
    id: index,
    name: testimonial.clientName,
    designation: testimonial.consultationDetails,
    content: (
      <p>
        {LanguageToStringLocale(testimonial.quote, locale)
          .split(' ')
          .map((word, i) =>
            i % 3 === 0 ? <Highlight key={i}>{word} </Highlight> : word + ' ',
          )}
      </p>
    ),
  }));
};

export const Highlight = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <span
      className={cn(
        'font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-700/[0.2] dark:text-emerald-500 px-1 py-0.5',
        className,
      )}
    >
      {children}
    </span>
  );
};

export function ProjectShowcase({
  selectedCountry,
}: {
  selectedCountry: string | null;
}) {
  const [data, setData] = useState(locationData[selectedCountry || 'default']);
  const [api, setApi] = useState<CarouselApi>();
  const [currentSlide, setCurrentSlide] = useState(0);
  const locale = useGetCurrentLocale();

  const allTestimonials = useMemo(
    () => Object.values(locationData).map((d) => d.testimonial),
    [],
  );
  const cardItems = useMemo(
    () => createCardStackItems(allTestimonials, locale),
    [allTestimonials, locale],
  );

  const selectedIndex = useMemo(() => {
    return allTestimonials.findIndex(
      (testimonial) => testimonial.clientName === data.testimonial.clientName,
    );
  }, [allTestimonials, data.testimonial]);

  const updateData = useCallback(
    (country: string | null) => {
      const newData = locationData[country || 'default'];
      setData(newData);
      if (api) {
        api.scrollTo(0);
      }
      setCurrentSlide(0);
    },
    [api],
  );

  useEffect(() => {
    updateData(selectedCountry);
  }, [selectedCountry, updateData]);

  useEffect(() => {
    if (!api) {
      return;
    }

    api.on('select', () => {
      setCurrentSlide(api.selectedScrollSnap());
    });
  }, [api]);

  const t = useTranslations('Consultant');

  return (
    <div className="flex w-full gap-8">
      <div className="w-2/3 relative group">
        <Carousel
          className="w-full"
          setApi={setApi}
          opts={{ align: 'start', loop: true }}
        >
          <CarouselContent>
            {data.images.map((image, index) => (
              <CarouselItem key={index}>
                <div className="relative aspect-video">
                  <Image
                    src={image}
                    alt={`Showcase ${index + 1}`}
                    width={1024}
                    height={576}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="absolute inset-x-0 bottom-4 flex justify-center gap-2 z-20">
            {data.images.map((_, index) => (
              <button
                key={index}
                onClick={() => api?.scrollTo(index)}
                className={cn(
                  'w-2 h-2 rounded-full transition-all duration-300',
                  currentSlide === index ? 'bg-white' : 'bg-white/50',
                )}
              />
            ))}
          </div>
          <CarouselPrevious className="opacity-0 group-hover:opacity-100 transition-opacity absolute left-4 z-20" />
          <CarouselNext className="opacity-0 group-hover:opacity-100 transition-opacity absolute right-4 z-20" />
        </Carousel>
        <motion.div
          initial={{
            opacity: 0,
            y: -80,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.6,
          }}
          className="absolute inset-0 z-10 flex items-center justify-center"
        >
          <motion.p className="font-bold text-xl md:text-4xl text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 py-4">
            {t('global.clientSuccessStories')}
          </motion.p>
        </motion.div>
      </div>
      <div className="w-1/3">
        <div className="h-full flex items-center justify-center w-full">
          <CardStack
            items={cardItems}
            selectedIndex={selectedIndex}
            offset={8}
            scaleFactor={0.04}
          />
        </div>
      </div>
    </div>
  );
}
