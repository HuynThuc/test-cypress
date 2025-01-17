import { FaYoutube } from 'react-icons/fa';

import { Button } from '../shacdn-ui/Button.components';

interface ViewButtonProps {
  url: string;
}

export function ViewYoutubeButton({ url }: ViewButtonProps) {
  const openInNewTab = (url: string) => {
    window.open(url, '_blank', 'noreferrer');
  };

  return (
    <Button variant="outline" size="icon" onClick={() => openInNewTab(url)}>
      <FaYoutube className="mx-auto w-7 scale-150" />
    </Button>
  );
}
