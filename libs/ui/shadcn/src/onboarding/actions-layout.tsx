import { TooltipProvider } from '@radix-ui/react-tooltip';

export const ActionsLayout: React.FC<{
  children: React.ReactNode | React.ReactNode[];
}> = ({ children }) => {
  return (
    <div className="flex justify-between mt-8">
      <TooltipProvider>{children}</TooltipProvider>
    </div>
  );
};
