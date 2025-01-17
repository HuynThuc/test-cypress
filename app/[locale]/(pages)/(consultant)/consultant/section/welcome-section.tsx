'use client';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

import { Button } from '@/shared/components/shacdn-ui/Button';

import { AutoMovingPointers } from '../components/auto-moving-pointer';

export function WelcomeSection() {
  const t = useTranslations('Consultant.welcome');

  return (
    <section
      id="welcome"
      className="h-screen flex items-center justify-center bg-gradient-to-b from-background to-muted/20"
    >
      <AutoMovingPointers>
        <div className="container mx-auto px-4 lg:px-8">
          <div className="w-full">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
              >
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                  {t('title')}
                  <span className="text-primary"> {t('companyName')}</span>
                </h1>
                <p className="text-lg text-muted-foreground max-w-[600px]">
                  {t('mission')}
                </p>
                <div className="flex gap-4">
                  <Button size="lg">{t('getStarted')}</Button>
                  <Button size="lg" variant="outline">
                    {t('learnMore')}
                  </Button>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="relative aspect-square max-w-[500px] mx-auto"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5 rounded-full animate-pulse" />
                <div className="absolute inset-4 bg-gradient-to-tr from-primary/30 to-primary/10 rounded-full animate-pulse delay-75" />
                <div className="absolute inset-8 bg-gradient-to-r from-primary/40 to-primary/20 rounded-full animate-pulse delay-150" />
              </motion.div>
            </div>
          </div>
        </div>
      </AutoMovingPointers>
    </section>
  );
}
