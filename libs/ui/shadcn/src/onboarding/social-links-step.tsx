'use client';

import type { Dispatch, SetStateAction } from 'react';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import {
  Facebook,
  Twitter,
  Globe,
  Instagram,
  MessageSquare,
} from 'lucide-react';
import { SocialLinks } from './types';

interface SocialLinksStepProps {
  socialLinks: SocialLinks;
  setSocialLinks: Dispatch<SetStateAction<SocialLinks>>;
}

export default function SocialLinksStep({
  socialLinks,
  setSocialLinks,
}: SocialLinksStepProps) {
  const handleInputChange = (key: keyof SocialLinks, value: string) => {
    setSocialLinks((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold">Social Links</h2>
        <p className="text-muted-foreground mt-2">
          Connect your social media accounts
        </p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="twitter" className="flex items-center">
            <Twitter className="h-4 w-4 mr-2" />
            Twitter
          </Label>
          <Input
            id="twitter"
            value={socialLinks.twitter}
            onChange={(e) => handleInputChange('twitter', e.target.value)}
            placeholder="https://twitter.com/yourusername"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="facebook" className="flex items-center">
            <Facebook className="h-4 w-4 mr-2" />
            Facebook
          </Label>
          <Input
            id="facebook"
            value={socialLinks.facebook}
            onChange={(e) => handleInputChange('facebook', e.target.value)}
            placeholder="https://facebook.com/yourpage"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="itchio" className="flex items-center">
            <Globe className="h-4 w-4 mr-2" />
            itch.io
          </Label>
          <Input
            id="itchio"
            value={socialLinks.itchio}
            onChange={(e) => handleInputChange('itchio', e.target.value)}
            placeholder="https://yourstudio.itch.io"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="instagram" className="flex items-center">
            <Instagram className="h-4 w-4 mr-2" />
            Instagram
          </Label>
          <Input
            id="instagram"
            value={socialLinks.instagram}
            onChange={(e) => handleInputChange('instagram', e.target.value)}
            placeholder="https://instagram.com/yourusername"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="discord" className="flex items-center">
            <MessageSquare className="h-4 w-4 mr-2" />
            Discord
          </Label>
          <Input
            id="discord"
            value={socialLinks.discord}
            onChange={(e) => handleInputChange('discord', e.target.value)}
            placeholder="https://discord.gg/yourinvite"
          />
        </div>
      </div>
    </div>
  );
}
