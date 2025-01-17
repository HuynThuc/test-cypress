'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { toast } from 'react-toastify';

import { Tabs, TabsList, TabsTrigger } from '@/shared/components/shacdn-ui';

import VideosTab from '@/modules/learners/components/search/widgets/VideosTab';
import VocabularyTab from '@/modules/learners/components/search/widgets/VocabbularyTab';
import ChannelsTab from '@/modules/learners/components/search/widgets/ChannelsTab';
import { fetchSearch } from '@/modules/learners/services/search/fetchSearch.service';
import { ITopChannelDetail } from '@/modules/learners/types';
import { ISearchResponse } from '@/modules/learners/types/Search.types';

interface TopChannelsProps {
  channels: ITopChannelDetail[];
  // error?: string | null | undefined;
}
type Tab = 'videos' | 'vocabulary' | 'channels';

const SearchComponent: React.FC<TopChannelsProps> = ({ channels }) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<Tab>('videos');
  const [apiData, setApiData] = useState<ISearchResponse | null>(null);
  const [page, setPage] = useState(1);
  const t = useTranslations('Search');
  const searchTerm = (searchParams.get('text') || '').trim();

  const handleSearch = async (page: number) => {
    try {
      const result = await fetchSearch(searchTerm, page, 10);
      if (result) {
        if (page === 1) {
          setApiData(result);
        } else {
          setApiData((prevData) => {
            return {
              videos: [...(prevData?.videos || []), ...(result.videos || [])],
              words: [...(prevData?.words || []), ...(result.words || [])],
              code: result.code ?? prevData?.code ?? 0,
              data: result.data ?? prevData?.data,
            };
          });
        }
      } else {
        toast.error('No data found');
      }
    } catch (error) {
      toast.error('Error fetching data');
    }
  };

  useEffect(() => {
    handleSearch(1);
  }, [searchTerm]);

  const handleClear = () => {
    router.push('/');
  };

  const handleLoadMore = () => {
    setPage((prev) => prev + 1);
    handleSearch(page + 1);
  };

  const tabs: Tab[] = ['videos', 'vocabulary', 'channels'];
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
      data-cy={`tab-${tab}`}
    >
      {t(tab).toUpperCase()}
    </TabsTrigger>
  ));

  const renderTab = () =>
    activeTab === 'videos' ? (
      <VideosTab
        searchTerm={searchTerm}
        handleClear={handleClear}
        videos={apiData?.videos}
        handleLoadMore={handleLoadMore}
      />
    ) : activeTab === 'vocabulary' ? (
      <VocabularyTab vocabulary={apiData?.words?.[0]} />
    ) : activeTab === 'channels' ? (
      <ChannelsTab
        searchTerm={searchTerm}
        handleClear={handleClear}
        channels={channels}
      />
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

export default SearchComponent;
