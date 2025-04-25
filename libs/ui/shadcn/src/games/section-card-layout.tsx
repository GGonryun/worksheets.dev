import { Plus } from 'lucide-react';
import { Button } from '../ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card';
import { cn } from '../utils';

export const SectionCardLayout: React.FC<{
  children: React.ReactNode;
  title: string;
  description: string;
  accessory?: React.ReactNode;
}> = ({ children, title, description, accessory }) => {
  return (
    <Card>
      <CardHeader
        className={cn(
          !!accessory ? 'flex flex-row items-center justify-between' : ''
        )}
      >
        <div>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </div>
        {accessory}
      </CardHeader>

      <CardContent>{children}</CardContent>
    </Card>
  );
};

export const DetailsSectionLayout: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  return (
    <SectionCardLayout
      title="Details"
      description="Information about your game, including title, description, and tags."
    >
      {children}
    </SectionCardLayout>
  );
};

export const MediaSectionLayout: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  return (
    <SectionCardLayout
      title="Media"
      description="Upload images and media for your game."
    >
      {children}
    </SectionCardLayout>
  );
};

export const FilesSectionLayout: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  return (
    <SectionCardLayout
      title="Files"
      description="Upload the game files and set the current version."
    >
      {children}
    </SectionCardLayout>
  );
};

export const VersionSectionLayout: React.FC<{
  children: React.ReactNode | React.ReactNode[];
  onAdd: () => void;
}> = ({ children, onAdd }) => {
  return (
    <SectionCardLayout
      title="Versions"
      description="Manage your game versions and releases."
      accessory={
        <Button onClick={onAdd}>
          <Plus className="mr-2 h-4 w-4" />
          Add Version
        </Button>
      }
    >
      {children}
    </SectionCardLayout>
  );
};
