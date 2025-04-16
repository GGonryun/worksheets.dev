'use client';

import type React from 'react';

import { useRef, useState } from 'react';
import Image from 'next/image';
import type { UseFormReturn } from 'react-hook-form';

import { Button } from '../ui/button';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { ImagePlus, Trash2 } from 'lucide-react';

interface TeamProfileFormProps {
  form: UseFormReturn<any>;
}

export const TeamProfileForm = ({ form }: TeamProfileFormProps) => {
  const [imagePreview, setImagePreview] = useState<string | null>(
    form.getValues().image || null
  );
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setImagePreview(result);
        form.setValue('image', result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleRemoveImage = () => {
    setImagePreview(null);
    form.setValue('image', '');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-6">
      <FormField
        control={form.control}
        name="image"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Team Logo</FormLabel>
            <FormControl>
              <div className="flex flex-col items-center space-y-4">
                <div
                  className="relative h-32 w-32 cursor-pointer overflow-hidden rounded-lg border border-dashed border-gray-300 bg-gray-50 transition-colors hover:bg-gray-100"
                  onClick={handleImageClick}
                >
                  {imagePreview ? (
                    <Image
                      src={imagePreview || '/placeholder.svg'}
                      alt="Team logo"
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center">
                      <ImagePlus className="h-8 w-8 text-gray-400" />
                    </div>
                  )}
                  <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </div>
                {imagePreview && (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={handleRemoveImage}
                    className="flex items-center space-x-1"
                  >
                    <Trash2 className="h-4 w-4" />
                    <span>Remove</span>
                  </Button>
                )}
              </div>
            </FormControl>
            <FormDescription>
              Upload your team's logo. Recommended size: 256x256px.
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Team Name</FormLabel>
            <FormControl>
              <Input placeholder="Acme Inc" {...field} />
            </FormControl>
            <FormDescription>
              This is your team's public display name.
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="description"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Description</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Tell us about your organization..."
                className="min-h-[120px] resize-y"
                {...field}
              />
            </FormControl>
            <FormDescription>
              Briefly describe your organization. This will be displayed on your
              public profile.
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};
