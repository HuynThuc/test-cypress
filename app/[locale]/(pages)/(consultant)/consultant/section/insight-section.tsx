'use client';
import { useTranslations } from 'next-intl';

import { useGetCurrentLocale } from '@/shared/hook';
import { LanguageToStringLocale } from '@/shared/utils';

import { HoverEffect } from '../components/card-hover-effect';
import { insights } from '../data/insights';

export function InsightsSection() {
  const t = useTranslations('Consultant.insights');
  const locale = useGetCurrentLocale();

  const localizedInsights = insights.map((insight) => ({
    ...insight,
    title: LanguageToStringLocale(insight.title, locale),
    insight: LanguageToStringLocale(insight.insight, locale),
    solution: LanguageToStringLocale(insight.solution, locale),
  }));

  return (
    <section
      id="insight"
      className="relative flex items-center py-24 bg-gradient-to-b from-muted/20 to-background"
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('title')}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t('description')}
          </p>
        </div>
        <HoverEffect items={localizedInsights} />
      </div>
    </section>
  );
}
