'use client';

import type React from 'react';

import { type Dispatch, type SetStateAction, useRef } from 'react';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Button } from '../ui/button';
import { ImageIcon, UploadIcon } from 'lucide-react';
import { TeamData } from './types';

interface TeamStepProps {
  teamData: TeamData;
  setTeamData: Dispatch<SetStateAction<TeamData>>;
}

export default function TeamStep({
  teamData,
  setTeamData: setTeamData,
}: TeamStepProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();

      reader.onload = (event) => {
        if (event.target && typeof event.target.result === 'string') {
          setTeamData((prev) => ({
            ...prev,
            image: file,
            imagePreview: event.target?.result as string,
          }));
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
          <Label htmlFor="orgName">
            Team Name <span className="text-red-500">*</span>
          </Label>
          <Input
            id="orgName"
            value={teamData.name}
            onChange={(e) =>
              setTeamData((prev) => ({ ...prev, name: e.target.value }))
            }
            placeholder="Enter your team name"
            required
          />
        </div>

        <div className="space-y-2">
          <Label>Team Image</Label>
          <div className="flex flex-col items-center justify-center">
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
                <Button
                  variant="outline"
                  size="sm"
                  className="absolute bottom-2 right-2"
                  onClick={() => fileInputRef.current?.click()}
                >
                  Change
                </Button>
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

            <Button
              type="button"
              variant="outline"
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center"
            >
              <UploadIcon className="mr-2 h-4 w-4" />
              {teamData.image ? 'Change Image' : 'Upload Image'}
            </Button>
          </div>
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
