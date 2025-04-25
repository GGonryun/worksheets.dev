import { Link2Icon } from 'lucide-react';
import { ControllerRenderProps } from 'react-hook-form';
import { cn } from '../../utils';
import { FormControl } from '../../ui/form';
import { Input } from '../../ui/input';

export const PrefixInput: React.FC<{
  field: ControllerRenderProps<any, any>;
  prefix: string;
  className?: string;
  placeholder?: string;
  disabled?: boolean;
}> = ({ field, className, prefix, placeholder, disabled }) => {
  return (
    <div
      className={cn(
        'flex rounded-md border border-input bg-background ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2',
        className
      )}
    >
      <span className="flex items-center pl-3 px-1 text-muted-foreground text-sm whitespace-nowrap bg-muted/50 gap-1.5">
        <Link2Icon className="h-4 w-4" /> {prefix}
      </span>
      <FormControl>
        <Input
          {...field}
          placeholder={placeholder}
          disabled={disabled}
          className="focus-visible:ring-0 focus-visible:ring-transparent rounded-l-none -m-[1px] pl-1 pt-1.5"
        />
      </FormControl>
    </div>
  );
};
