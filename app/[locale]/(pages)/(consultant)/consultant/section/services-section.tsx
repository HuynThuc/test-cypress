'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

import { Button } from '@/shared/components/shacdn-ui/Button';
import { useGetCurrentLocale } from '@/shared/hook';

import { LanguageToStringAtLocal } from '../utils/utils';

const services = [
  {
    key: 'fullStartupTeam',
    image:
      'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop',
    title: {
      en: 'Full Startup Team Deployment',
      ja: 'フルスタートアップチーム展開',
      vi: 'Triển khai Đội ngũ Startup Đầy đủ',
    },
    description: {
      en: 'We provide a dedicated team to rapidly execute your startup idea, from inception to end-user delivery. Our projects range from CRM systems to AI-integrated solutions.',
      ja: '私たちは、スタートアップのアイデアを構想からエンドユーザーへの提供まで迅速に実行するための専任チームを提供します。プロジェクトはCRMシステムからAI統合ソリューションまで多岐にわたります。',
      vi: 'Chúng tôi cung cấp một đội ngũ chuyên dụng để nhanh chóng thực hiện ý tưởng startup của bạn, từ khởi đầu đến giao hàng cho người dùng cuối. Các dự án của chúng tôi bao gồm từ hệ thống CRM đến các giải pháp tích hợp AI.',
    },
    features: {
      en: [
        'End-to-End Project Management',
        'Custom Team Assembly',
        'AI and CRM Expertise',
      ],
      ja: [
        'エンドツーエンドのプロジェクト管理',
        'カスタムチーム編成',
        'AIとCRMの専門知識',
      ],
      vi: [
        'Quản lý Dự án Đầu cuối',
        'Lắp ráp Đội ngũ Tùy chỉnh',
        'Chuyên môn về AI và CRM',
      ],
    },
  },
  {
    key: 'specializedTalent',
    image:
      'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop',
    title: {
      en: 'Specialized Talent Augmentation',
      ja: '専門人材の増強',
      vi: 'Tăng cường Nhân tài Chuyên biệt',
    },
    description: {
      en: 'If you already have a team and need to hire engineers, UI/UX designers, etc., we provide the specialized talent you need to enhance your project.',
      ja: '既存のチームがあり、エンジニアやUI/UXデザイナーなどを雇用する必要がある場合、プロジェクトを強化するために必要な専門人材を提供します。',
      vi: 'Nếu bạn đã có một đội ngũ và cần thuê kỹ sư, nhà thiết kế UI/UX, v.v., chúng tôi cung cấp nhân tài chuyên biệt bạn cần để nâng cao dự án của mình.',
    },
    features: {
      en: [
        'Flexible Talent Solutions',
        'Expert Engineers and Designers',
        'Seamless Integration with Your Team',
      ],
      ja: [
        '柔軟な人材ソリューション',
        '専門エンジニアとデザイナー',
        '既存チームとのシームレスな統合',
      ],
      vi: [
        'Giải pháp Nhân tài Linh hoạt',
        'Kỹ sư và Nhà thiết kế Chuyên gia',
        'Tích hợp Liền mạch với Đội ngũ của Bạn',
      ],
    },
  },
];

const techStack = [
  { name: 'Aws', src: '/tech/aws.svg' },
  { name: 'Python', src: '/tech/python.svg' },
  { name: 'Django', src: '/tech/django.svg' },
  { name: 'FastAPI', src: '/tech/fastapi.svg' },
  { name: 'Go', src: '/tech/go.svg' },
  { name: 'React', src: '/tech/react.svg' },
  { name: 'Javascript', src: '/tech/javascript.svg' },
  { name: 'Typescript', src: '/tech/typescript.svg' },
  { name: 'NestJs', src: '/tech/nestjs.svg' },
  { name: 'NextJs', src: '/tech/nextjs.svg' },
  { name: 'Figma', src: '/tech/figma.svg' },
];

export function ServicesSection() {
  const t = useTranslations('Consultant.services');
  const locale = useGetCurrentLocale();

  return (
    <section
      id="services"
      className="py-24 bg-gradient-to-b from-muted/20 to-background"
    >
      <div className="container px-4 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">{t('title')}</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('description')}
          </p>
        </motion.div>

        <div className="space-y-32">
          {services.map((service, index) => (
            <motion.div
              key={service.key}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="grid lg:grid-cols-2 gap-12 items-center"
            >
              <motion.div
                className={`space-y-6 ${index % 2 === 1 ? 'lg:order-2' : ''}`}
                initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <h3 className="text-3xl font-bold">
                  {LanguageToStringAtLocal(service.title, locale) as string}
                </h3>
                <p className="text-lg text-muted-foreground">
                  {
                    LanguageToStringAtLocal(
                      service.description,
                      locale,
                    ) as string
                  }
                </p>
                <div className="space-y-4">
                  <h4 className="text-xl font-semibold">Key Features:</h4>
                  <ul className="space-y-4">
                    {(
                      LanguageToStringAtLocal(
                        service.features,
                        locale,
                      ) as string[]
                    ).map((item, i) => (
                      <motion.li
                        key={item}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.6 + i * 0.1 }}
                        className="flex items-center space-x-3"
                      >
                        <svg
                          className="h-6 w-6 text-primary flex-shrink-0"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12l2 2 4-4"
                          />
                        </svg>
                        <span>{item}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
                <Button size="lg" variant="outline">
                  {t('learnMore')}
                </Button>
              </motion.div>

              <motion.div
                className={`relative ${index % 2 === 1 ? 'lg:order-1' : ''}`}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-primary/10 to-primary/5 p-1">
                  <Image
                    src={service.image}
                    alt={
                      LanguageToStringAtLocal(service.title, locale) as string
                    }
                    width={500}
                    height={400}
                    className="rounded-xl"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-60 mix-blend-overlay" />
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mt-16 text-center"
        >
          <h3 className="text-2xl font-semibold mb-8">{t('technologies')}</h3>
          <div className="flex flex-wrap justify-center items-center gap-8">
            {techStack.map((tech, index) => (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative"
              >
                <Image
                  src={tech.src}
                  alt={tech.name}
                  width={40}
                  height={40}
                  className="transition-transform duration-300 group-hover:scale-110"
                />
                <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {tech.name}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
