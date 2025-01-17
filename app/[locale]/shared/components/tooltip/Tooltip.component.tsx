import classes from './Tooltip.module.scss';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../shacdn-ui/Tooltip.components';

interface Props {
  title: () => string | React.ReactElement;
  content: string | React.ReactElement;
}

export default function TooltipCustom({ title, content }: Props) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger className={classes['title']} asChild>
          <p>{title()}</p>
        </TooltipTrigger>
        <TooltipContent className={classes['content']}>
          <p>{content}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
