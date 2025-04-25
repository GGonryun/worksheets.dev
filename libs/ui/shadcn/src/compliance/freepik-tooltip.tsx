import Link from 'next/link';
import { useMouse } from '../hooks/use-mouse';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';

export const FreepikTooltip: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { ref, x, y } = useMouse<HTMLDivElement>();
  return (
    <Tooltip>
      <TooltipTrigger>
        <div ref={ref}>{children}</div>
      </TooltipTrigger>
      <TooltipContent
        align="start"
        alignOffset={x - 70}
        sideOffset={-y + 10}
        hideWhenDetached
      >
        Designed by{' '}
        <Link href="https://www.freepik.com" className="underline">
          Freepik
        </Link>
      </TooltipContent>
    </Tooltip>
  );
};
