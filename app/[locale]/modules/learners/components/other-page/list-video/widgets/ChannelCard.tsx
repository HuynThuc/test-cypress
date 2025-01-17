import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

import { Card, CardContent } from '@/shared/components/shacdn-ui/Card';
import { Icons } from '@/shared/components/Icon/icons';

import { ITopChannelDetail } from '@/modules/learners/types/VideoChannels.types';
import { formatViewCount } from '@/modules/learners/utils';

interface ChannelCardProps {
  channel: ITopChannelDetail;
}

export default function ChannelCard({ channel }: ChannelCardProps) {
  const t = useTranslations('Videos');
  return (
    <Link href={`videos/channel/${channel.channelId}`}>
      <Card className="w-60 h-72 relative overflow-hidden group border-border/30 rounded shadow-e1 mb-1">
        <div
          className="absolute inset-0 bg-cover bg-center blur"
          style={{ backgroundImage: `url(${channel.avatarUrl})` }}
        >
          <div className="absolute inset-0 bg-background/75 transition-all duration-300"></div>
        </div>
        <CardContent className="py-6 px-3 flex flex-col items-center gap-6 h-full relative z-10">
          <div className="flex flex-col items-center">
            <div className="w-[120px] h-[120px] rounded-full overflow-hidden border-2 border-white">
              <Image
                src={channel.avatarUrl}
                alt={channel.title}
                width={120}
                height={120}
                quality={100}
                className="object-cover "
              />
            </div>
          </div>
          <div className="w-full text-xs text-text-secondary space-y-2">
            <h6 className="mb-2 text-text-light line-clamp-2">
              {channel.title}
            </h6>
            <div className="flex items-center justify-start gap-2 text-label-small">
              <Icons.videos className="w-4 h-4" />
              <span>{channel.totalVideosCount} videos</span>
            </div>
            <div className="flex items-center justify-start gap-2 text-label-small">
              <Icons.users className="w-4 h-4" />
              <span>
                {formatViewCount(channel.totalPracticedUser)}{' '}
                {t('usersPracticed')}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
