'use client';

import { GameForm } from './game-form';
import { MediaForm } from './media-form';
import { VersionsList } from './versions-list';
import { FeedbackList } from './feedback-list';
import { Button } from '../ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { ChevronLeft } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '../ui/alert-dialog';

export function UpdateGame({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('details');
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [showExitDialog, setShowExitDialog] = useState(false);
  const [exitPath, setExitPath] = useState('');

  // Simulate unsaved changes for demo purposes
  useEffect(() => {
    // In a real app, this would be set by the form components
    setHasUnsavedChanges(true);
  }, []);

  // Handle navigation with unsaved changes
  const handleNavigation = (path: string) => {
    if (hasUnsavedChanges) {
      setExitPath(path);
      setShowExitDialog(true);
    } else {
      router.push(path);
    }
  };

  // Confirm navigation
  const confirmNavigation = () => {
    setShowExitDialog(false);
    router.push(exitPath);
  };

  return (
    <>
      <div className="container py-6 space-y-6">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => handleNavigation('/dashboard')}
          >
            <ChevronLeft className="h-5 w-5" />
            <span className="sr-only">Back to dashboard</span>
          </Button>
          <h1 className="text-2xl font-bold">Edit Game</h1>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full grid grid-cols-4">
            <TabsTrigger value="details">Game Details</TabsTrigger>
            <TabsTrigger value="media">Media</TabsTrigger>
            <TabsTrigger value="versions">Versions</TabsTrigger>
            <TabsTrigger value="feedback">Feedback</TabsTrigger>
          </TabsList>
          <TabsContent value="details" className="pt-4">
            <GameForm
              gameId={params.id}
              onSave={() => setHasUnsavedChanges(false)}
            />
          </TabsContent>
          <TabsContent value="media" className="pt-4">
            <MediaForm
              gameId={params.id}
              onSave={() => setHasUnsavedChanges(false)}
            />
          </TabsContent>
          <TabsContent value="versions" className="pt-4">
            <VersionsList gameId={params.id} />
          </TabsContent>
          <TabsContent value="feedback" className="pt-4">
            <FeedbackList gameId={params.id} />
          </TabsContent>
        </Tabs>
      </div>

      <AlertDialog open={showExitDialog} onOpenChange={setShowExitDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Unsaved Changes</AlertDialogTitle>
            <AlertDialogDescription>
              You have unsaved changes that will be lost if you leave this page.
              Are you sure you want to continue?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmNavigation}>
              Leave Page
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
