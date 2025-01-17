import dynamic from 'next/dynamic';

import { getInitialHomePageTopChannels } from '@/app/[locale]/modules/learners/services/list-video';

const SearchComponent = dynamic(
  () => import('@/modules/learners/components/search/SearchComponent'),
);

export default async function SearchPage() {
  const channelsRes = await getInitialHomePageTopChannels();
  const channels = channelsRes.data ?? [];
  return (
    <div className="-mt-[33.5px]">
      <SearchComponent channels={channels} />
    </div>
  );
}
