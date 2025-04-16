import { InfoIcon } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';

export const FileRequirements: React.FC<{
  title: string;
  description: string;
  items: string[];
}> = (props) => {
  return (
    <Alert
      variant="default"
      className="mt-2 bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800"
    >
      <InfoIcon className="h-4 w-4 text-blue-500" />
      <AlertTitle className="mb-2">{props.title}</AlertTitle>
      <AlertDescription>
        {props.description}
        <ul className="list-disc list-inside mt-1 text-xs space-y-1">
          {props.items.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </AlertDescription>
    </Alert>
  );
};
