'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { Button } from '../ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card';
import { Form } from '../ui/form';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { toast } from '../hooks/use-toast';
import { TeamProfileForm } from './team-profile-form';
import { TeamSocialForm } from './team-social-form';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';

// This would typically come from your database
const defaultValues = {
  name: 'Acme Inc',
  description: 'We make everything',
  image: '/placeholder.svg?height=150&width=150',
  twitter: 'https://twitter.com/acme',
  facebook: 'https://facebook.com/acme',
  instagram: 'https://instagram.com/acme',
  linkedin: 'https://linkedin.com/company/acme',
};

export const TeamSettingsContent = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');
  const [pendingTab, setPendingTab] = useState<string | null>(null);
  const [showDialog, setShowDialog] = useState(false);
  const [dialogAction, setDialogAction] = useState<
    'tab-switch' | 'cancel' | null
  >(null);

  const form = useForm({
    defaultValues,
  });

  const isDirty = form.formState.isDirty;

  // Handle browser navigation/refresh warning
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isDirty) {
        e.preventDefault();
        e.returnValue = '';
        return '';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [isDirty]);

  // Handle tab switching with unsaved changes
  const handleTabChange = (value: string) => {
    if (isDirty) {
      setPendingTab(value);
      setDialogAction('tab-switch');
      setShowDialog(true);
    } else {
      setActiveTab(value);
    }
  };

  // Handle cancel button click with unsaved changes
  const handleCancel = () => {
    if (isDirty) {
      setDialogAction('cancel');
      setShowDialog(true);
    } else {
      form.reset();
    }
  };

  // Handle dialog confirmation
  const handleConfirm = () => {
    if (dialogAction === 'tab-switch' && pendingTab) {
      form.reset();
      setActiveTab(pendingTab);
    } else if (dialogAction === 'cancel') {
      form.reset();
    }
    setShowDialog(false);
    setPendingTab(null);
    setDialogAction(null);
  };

  // Handle dialog dismissal
  const handleDismiss = () => {
    setShowDialog(false);
    setPendingTab(null);
    setDialogAction(null);
  };

  async function onSubmit(data: typeof defaultValues) {
    setIsLoading(true);

    try {
      // This would be your API call to update the team
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast({
        title: 'Settings updated',
        description: 'Your team settings have been updated successfully.',
      });

      // Mark form as pristine after successful save
      form.reset(data);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update team settings. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Tabs
            value={activeTab}
            onValueChange={handleTabChange}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="social">Social Links</TabsTrigger>
            </TabsList>
            <TabsContent value="profile" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Team Profile</CardTitle>
                  <CardDescription>
                    Update your team's basic information
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <TeamProfileForm form={form} />
                </CardContent>
                <CardFooter className="flex justify-end space-x-4 border-t px-6 py-4">
                  <Button
                    variant="outline"
                    type="button"
                    onClick={handleCancel}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" disabled={isLoading}>
                    {isLoading ? 'Saving...' : 'Save changes'}
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
            <TabsContent value="social" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Social Links</CardTitle>
                  <CardDescription>
                    Connect your team's social media accounts
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <TeamSocialForm form={form} />
                </CardContent>
                <CardFooter className="flex justify-end space-x-4 border-t px-6 py-4">
                  <Button
                    variant="outline"
                    type="button"
                    onClick={handleCancel}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" disabled={isLoading}>
                    {isLoading ? 'Saving...' : 'Save changes'}
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </form>
      </Form>

      {/* Unsaved Changes Dialog */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Unsaved Changes</DialogTitle>
            <DialogDescription>
              You have unsaved changes. Are you sure you want to discard them?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={handleDismiss}>
              Continue Editing
            </Button>
            <Button variant="destructive" onClick={handleConfirm}>
              Discard Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
