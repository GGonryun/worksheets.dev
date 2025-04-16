'use client';

import type React from 'react';

import {
  type Dispatch,
  type SetStateAction,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Button } from '../ui/button';
import {
  ImageIcon,
  InfoIcon,
  Link2Icon,
  Trash2Icon,
  UploadIcon,
} from 'lucide-react';
import { TeamData } from './types';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { generateTeamSlug, validateTeamName } from '@worksheets/util/team';
import { routes } from '@worksheets/routes';
import Link from 'next/link';

interface TeamStepProps {
  teamData: TeamData;
  setTeamData: Dispatch<SetStateAction<TeamData>>;
  imageError: string;
  setImageError: Dispatch<SetStateAction<string>>;
  nameError: string;
  setNameError: Dispatch<SetStateAction<string>>;
}

const fileChecks = [
  {
    label: 'Maximum file size: 1.5MB',
    error: 'Image size exceeds 1.5MB limit',
    query: (file: File) => file.size <= 1.5 * 1024 * 1024,
  },
  {
    label: 'Recommended formats: PNG, JPG',
    error: 'Image must be a PNG or JPG',
    query: (file: File) =>
      file.type === 'image/png' || file.type === 'image/jpeg',
  },
];
const imageChecks = [
  {
    label: 'Dimensions: At least 300×300 pixels',
    error: 'Image dimensions must be at least 300x300',
    query: (img: HTMLImageElement) => img.width >= 300 && img.height >= 300,
  },
  {
    label: 'Size: Image must be a square',
    error: 'Image must be a square',
    query: (img: HTMLImageElement) => img.width === img.height,
  },
];

export default function TeamStep({
  teamData,
  setTeamData,
  imageError,
  setImageError,
  nameError,
  setNameError,
}: TeamStepProps) {
  const [infoOpen, setInfoOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const slug = generateTeamSlug(teamData.name);
    setTeamData((prev) => ({ ...prev, slug }));
  }, [teamData.name, setTeamData]);

  // Validate team name
  useEffect(() => {
    const error = validateTeamName(teamData.name);
    setNameError(error);
  }, [teamData.name, setNameError]);

  const teamUrl = useMemo(() => {
    return `${routes.baseUrl}/teams/${teamData.slug}`;
  }, [teamData.slug]);

  const handleClearImage = () => {
    setImageError('');
    setTeamData((prev) => ({
      ...prev,
      image: null,
      imagePreview: '',
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      for (const check of fileChecks) {
        if (check.error && check.query && !check.query(file)) {
          setImageError(check.error);
          return;
        }
      }

      const reader = new FileReader();

      reader.onload = (event) => {
        if (event.target && typeof event.target.result === 'string') {
          // Check image dimensions
          const img = new Image();
          img.onload = () => {
            for (const check of imageChecks) {
              if (check.error && check.query && !check.query(img)) {
                setImageError(check.error);
                return;
              }
            }

            setImageError('');
            setTeamData((prev) => ({
              ...prev,
              image: file,
              imagePreview: event.target?.result as string,
            }));
          };
          img.src = event.target.result as string;
        }
      };

      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold">Team Details</h2>
        <p className="text-muted-foreground mt-2">Tell us about your Team</p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="team-name" aria-required>
            Team Name <span className="text-red-500">*</span>
          </Label>
          <Input
            id="team-name"
            value={teamData.name}
            onChange={(e) =>
              setTeamData((prev) => ({ ...prev, name: e.target.value }))
            }
            placeholder="Enter your team name"
            required
          />
          {nameError && (
            <p className="text-sm text-red-500 mt-1">{nameError}</p>
          )}

          {teamData.slug && (
            <div className="flex items-center mt-2 text-sm text-muted-foreground">
              <Link2Icon className="h-3.5 w-3.5 mr-1.5" />
              <Link href={teamUrl} className="font-medium">
                {teamUrl}
              </Link>
            </div>
          )}
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Label htmlFor="image-requirements" aria-required>
              Team Image <span className="text-red-500">*</span>
            </Label>
            <Popover open={infoOpen} onOpenChange={setInfoOpen}>
              <PopoverTrigger asChild>
                <Button
                  id="image-requirements"
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 rounded-full md:hidden"
                  aria-label="Image requirements"
                >
                  <InfoIcon className="h-4 w-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent side="right" className="w-[240px] p-0">
                <ImageRequirements />
              </PopoverContent>
            </Popover>
          </div>
          <div className="flex items-start justify-between">
            <div>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageChange}
                accept="image/*"
                className="hidden"
                id="imageUpload"
              />

              {teamData.imagePreview ? (
                <div className="relative w-32 h-32 mb-4">
                  <img
                    src={teamData.imagePreview || '/placeholder.svg'}
                    alt="Team preview"
                    className="w-32 h-32 object-cover rounded-md"
                  />
                </div>
              ) : (
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="w-32 h-32 border-2 border-dashed rounded-md flex flex-col items-center justify-center cursor-pointer hover:bg-muted transition-colors mb-4"
                >
                  <ImageIcon className="h-10 w-10 text-muted-foreground mb-2" />
                  <span className="text-sm text-muted-foreground">
                    Upload Image
                  </span>
                </div>
              )}

              {teamData.image ? (
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => handleClearImage()}
                  className="flex items-center"
                >
                  <Trash2Icon className="mr-2 h-4 w-4" />
                  Remove Image
                </Button>
              ) : (
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => fileInputRef.current?.click()}
                  className="flex items-center"
                >
                  <UploadIcon className="mr-2 h-4 w-4" />
                  Upload Image
                </Button>
              )}
            </div>
            {/* Requirements box - visible on md screens and up */}
            <div className="hidden md:block flex-1">
              <ImageRequirements />
            </div>
          </div>
          {imageError && (
            <p className="text-sm text-red-500 mb-2">{imageError}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="description">
            Short Description <span className="text-red-500">*</span>
          </Label>
          <Textarea
            id="description"
            value={teamData.description}
            onChange={(e) =>
              setTeamData((prev) => ({
                ...prev,
                description: e.target.value,
              }))
            }
            placeholder="Briefly describe your team"
            rows={4}
            required
          />
          <p className="text-sm text-muted-foreground">
            {teamData.description.length}/250 characters
          </p>
        </div>
      </div>
    </div>
  );
}

const ImageRequirements = () => (
  <div className="space-y-2 p-3 bg-muted/50 rounded-md">
    <h4 className="font-medium text-sm">Image Requirements:</h4>
    <ul className="text-xs space-y-1 text-muted-foreground">
      {[...imageChecks, ...fileChecks]
        .filter((check) => check.label)
        .map((check, index) => (
          <li key={index} className="flex items-start">
            <span className="mr-2">•</span>
            <span>{check.label}</span>
          </li>
        ))}
    </ul>
  </div>
);
