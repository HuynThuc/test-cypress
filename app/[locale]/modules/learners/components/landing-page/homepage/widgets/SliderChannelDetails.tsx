import Image from 'next/image';
import Link from 'next/link';

import { Button } from '@/shared/components';
import { Icons } from '@/shared/components/Icon/icons';

import { ITopChannelDetail } from '@/modules/learners/types';
interface SliderChannelDetailsProps {
  channel: ITopChannelDetail;
}

export const SliderChannelDetails: React.FC<SliderChannelDetailsProps> = ({
  channel,
}) => {
  return (
    <div className="space-y-3">
      {/* Channel Logo and Title */}
      <div className="w-14 h-14">
        <Image
          src={channel.avatarUrl}
          alt={channel.title}
          width={56}
          height={56}
          className="rounded-full"
        />
      </div>

      <h6 className="text-primary">{channel.title}</h6>
      <p className="text-xs leading-6 text-text-secondary line-clamp-3">
        {channel.description}
      </p>

      {/* Action Button */}
      <div>
        <Link href={`videos/channel/${channel.channelId}`}>
          <Button className="w-max sm:w-auto bg-primary hover:bg-primary/90 text-text-onPrimary px-6 py-2 rounded-md flex items-center justify-center gap-2">
            <Icons.compass className="h-6 w-6" />
            Explore Channel
          </Button>
        </Link>
      </div>
    </div>
  );
};
