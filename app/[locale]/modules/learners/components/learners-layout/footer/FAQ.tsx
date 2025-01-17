'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';

import { Tabs, TabsList, TabsTrigger } from '@/shared/components/shacdn-ui';

import {
  policyContent,
  termsContent,
} from '@/modules/learners/components/learners-layout/footer/widgets/mokeDataFAQ';
import FAQContent from '@/modules/learners/components/learners-layout/footer/widgets/FAQContent';

type Tab = 'privacy' | 'terms' | 'faqs';

const FAQ = () => {
  const [activeTab, setActiveTab] = useState<Tab>('privacy');
  const tabs: Tab[] = ['privacy', 'terms', 'faqs'];
  const t = useTranslations('Footer');
  const handleTabChange = (value: string) => {
    if (tabs.includes(value as Tab)) {
      setActiveTab(value as Tab);
    }
  };

  const tabList = tabs.map((tab) => (
    <TabsTrigger
      key={tab}
      value={tab}
      className="relative w-fit sm:pt-5 sm:pb-[18px] pt-4 pb-3.5 px-0 text-stylized-lead data-[state=active]:text-primary data-[state=active]:after:bg-primary data-[state=active]:after:w-full data-[state=active]:after:absolute data-[state=active]:after:-bottom-[2px] data-[state=active]:after:h-[3px] data-[state=active]:after:border data-[state=active]:after:border-primary data-[state=active]:after:rounded-full"
    >
      {t(tab).toUpperCase()}
    </TabsTrigger>
  ));

  const renderTab = () =>
    activeTab === 'privacy' ? (
      <div className="mt-8 rounded-lg border border-border p-6 shadow-xl">
        <div className="whitespace-pre-line text-gray-700 leading-relaxed text-text-light">
          {policyContent}
        </div>
      </div>
    ) : activeTab === 'terms' ? (
      <div className="mt-8 rounded-lg border border-border p-6 shadow-xl">
        <div className="whitespace-pre-line text-gray-700 leading-relaxed text-text-light">
          {termsContent}
        </div>
      </div>
    ) : activeTab === 'faqs' ? (
      <FAQContent />
    ) : (
      <div>No content available for this tab.</div>
    );

  return (
    <div className="w-full mx-auto p-4">
      <Tabs
        value={activeTab}
        onValueChange={handleTabChange}
        className="w-full border-b border-border/25"
      >
        <TabsList className="bg-transparent w-full sm:justify-start justify-between h-fit p-0 overflow-visible flex sm:gap-8 gap-4 text-border">
          {tabList}
        </TabsList>
      </Tabs>
      {renderTab()}
    </div>
  );
};

export default FAQ;
