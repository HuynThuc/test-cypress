import classNames from 'classnames';
import { useTranslations } from 'next-intl';

import { Icons } from '@/shared/components/Icon/icons';

interface SessitonHeaderProps {
  title: string;
  atStart: boolean;
  atEnd: boolean;
  isViewAll: boolean;
  scrollLeft: () => void;
  scrollRight: () => void;
}

// Helper Component for Previous Icon
const PrevIcon = ({ atStart }: { atStart: boolean }) => {
  return atStart ? (
    <Icons.prev className="text-icon" />
  ) : (
    <Icons.prevfill className="text-icon" />
  );
};

// Helper Component for Next Icon
const NextIcon = ({ atEnd }: { atEnd: boolean }) => {
  return atEnd ? (
    <Icons.next className="text-icon w-full h-full" />
  ) : (
    <Icons.nextfill className="text-icon w-full h-full" />
  );
};

const SessionHeader = ({
  title,
  atStart,
  atEnd,
  isViewAll,
  scrollLeft,
  scrollRight,
}: SessitonHeaderProps) => {
  const t = useTranslations('Home');

  const renderViewAll = isViewAll && (
    <div
      onClick={() => {}}
      className="text-stylized-lead text-primary cursor-pointer select-none"
    >
      {t('viewAll')}
    </div>
  );

  const atStartClassname = atStart
    ? 'cursor-not-allowed bg-background-dark'
    : 'cursor-pointer bg-background-light';

  const atEndClassname = atEnd
    ? 'cursor-not-allowed bg-background-dark'
    : 'cursor-pointer bg-background-light';

  return (
    <div className="flex justify-between items-center lg:mb-4 sm:mb-3.5 mb-3">
      <h6>{title}</h6>
      <div className="flex items-center justify-center space-x-2">
        <div>{renderViewAll}</div>

        <button
          onClick={scrollLeft}
          className={classNames(
            'flex items-center justify-center rounded-full',
            atStartClassname,
          )}
          disabled={atStart}
        >
          <div className="w-6 h-6">
            <PrevIcon atStart={atStart} />
          </div>
        </button>

        <button
          onClick={scrollRight}
          className={classNames(
            'flex items-center justify-center rounded-full',
            atEndClassname,
          )}
          disabled={atEnd}
        >
          <div className="w-6 h-6">
            <NextIcon atEnd={atEnd} />
          </div>
        </button>
      </div>
    </div>
  );
};

export default SessionHeader;
