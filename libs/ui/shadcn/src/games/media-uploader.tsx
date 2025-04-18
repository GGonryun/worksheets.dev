'use client';

import type React from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Upload } from 'lucide-react';
import { useState } from 'react';

type MediaUploaderProps = {
  value: File[];
  onChange: (value: null | File[]) => void;
  type: 'image' | 'zip';
  label: string;
  max?: number;
  description?: string;
  fileTypes?: string[];
};

export function MediaUploader({
  value,
  onChange,
  type,
  label,
  max = 1,
  description = 'Drag and drop files here or click to browse.',
  fileTypes,
}: MediaUploaderProps) {
  const [dragActive, setDragActive] = useState(false);

  const allowMultiple = type === 'image' && max > 1;

  const updateFiles = async (files: FileList | File[]) => {
    if (allowMultiple) {
      onChange([...value, ...Array.from(files)]);
    } else {
      const file = files[0];
      onChange([file]);
    }
  };

  // Handle file selection
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;

    updateFiles(e.target.files);
    // Clear the input
    e.target.value = '';
  };

  // Handle drag events
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  // Handle drop event
  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (!e.dataTransfer.files?.length) return;

    updateFiles(e.dataTransfer.files);
  };

  return (
    <div
      className={`flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-6 text-center ${
        dragActive
          ? 'border-primary bg-primary/5'
          : 'border-muted-foreground/25'
      }`}
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
    >
      <div className="flex flex-col items-center justify-center gap-2">
        <div className="rounded-full bg-primary/10 p-3">
          <Upload className="h-6 w-6 text-primary" />
        </div>
        <p className="text-sm font-medium">{label}</p>
        <p className="text-xs text-muted-foreground">{description}</p>
        <Input
          type="file"
          accept={
            type === 'image'
              ? fileTypes?.join(',') || 'image/*'
              : type === 'zip'
              ? '.zip'
              : '*'
          }
          multiple={allowMultiple}
          className="hidden"
          id={`file-upload-${label.replace(/\s+/g, '-').toLowerCase()}`}
          onChange={handleFileChange}
        />
        <Button
          variant="outline"
          size="sm"
          onClick={() =>
            document
              .getElementById(
                `file-upload-${label.replace(/\s+/g, '-').toLowerCase()}`
              )
              ?.click()
          }
          type="button"
        >
          Choose File
        </Button>
      </div>
    </div>
  );
}
