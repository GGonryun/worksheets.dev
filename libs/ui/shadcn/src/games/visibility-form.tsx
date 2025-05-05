import { TeamSelectedQuery, TeamGamesReadQuery } from '../types';
import { SectionCardLayout } from './section-card-layout';
import {
  visibilityFormDefaultValues,
  visibilityFormSchema,
  VisibilityFormSchema,
} from '@worksheets/util/types';
import { Form, FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useEffect, useRef } from 'react';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';
import { GameStatus, GameVisibility } from '@prisma/client';
import { devRoutes, routes } from '@worksheets/routes';
import Link from 'next/link';

import {
  Button,
  Label,
  RadioGroup,
  RadioGroupItem,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogTitle,
  Card,
  AlertDialogHeader,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from '../ui';
import {
  AlertCircle,
  Ban,
  CheckCircle,
  CircleHelp,
  Clock,
  Globe2,
  LoaderCircle,
  LucideIcon,
  Save,
  Sparkles,
  SquarePen,
  Trash2Icon,
  TrashIcon,
} from 'lucide-react';
import { cn } from '../utils';
import { useToast } from '../hooks';
import { trpc } from '@worksheets/trpc-charity';
import { parseTRPCClientErrorMessage } from '@worksheets/util/trpc';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { FillImage } from '@worksheets/ui/components/images';
import { useMouse } from '../hooks/use-mouse';
import { MeteorShowerCanvas } from '../animations/meteor-shower-canvas';
import { StarryBackground } from '../animations/starry-background-canvas';
import { FreepikTooltip } from '../compliance/freepik-tooltip';
import { set } from 'lodash';
import { keysOf } from '@worksheets/util/objects';
import { useRouter } from 'next/router';

const GAME_STATUS_LABEL: Record<GameStatus, string> = {
  APPROVED: 'Approved',
  PENDING: 'Pending Approval',
  DRAFT: 'Draft',
  REJECTED: 'Rejected',
  CHANGES_REQUESTED: 'Action Required',
  UNPUBLISHED: 'Unpublished',
  PUBLISHED: '',
  DELETED: '',
};

const GAME_STATUS_ALERT: Record<GameStatus, React.ReactNode> = {
  APPROVED: (
    <p>
      Your application has been approved for distribution, you can select
      unlisted or public distribution. All games must adhere to our submission
      guidelines,{' '}
      <Link href={routes.help.developers.url()} className="underline">
        click here for more information
      </Link>
      .
    </p>
  ),
  PENDING: (
    <p>
      Your game is pending approval and we will contact you shortly. If you
      would like to expedite the process, please reach out to us via our{' '}
      <Link href={routes.contact.url()} className="underline">
        contact methods
      </Link>
      .
    </p>
  ),
  DRAFT: (
    <p>
      You must first submit your game for approval before changing the
      visibility of your game.
    </p>
  ),
  REJECTED: (
    <p>
      Your game has been rejected due to a violation of our terms of service or
      our submission guidelines. The game is scheduled to be removed from the
      platform. If you have any questions or concerns, please contact us via our{' '}
      <Link href={routes.contact.url()} className="underline">
        contact methods
      </Link>
    </p>
  ),
  CHANGES_REQUESTED: (
    <p>
      Your game requires changes before it can be approved. Please review the
      feedback emailed to you and resubmit your game for approval. If you have
      any questions or concerns, please contact us via our{' '}
      <Link href={routes.contact.url()} className="underline">
        contact methods
      </Link>
      .
    </p>
  ),
  // TODO: remove after migration
  UNPUBLISHED: (
    <p>
      Your game is currently unpublished. Please submit your game for approval
      to make it visible to the public.
    </p>
  ),
  PUBLISHED: undefined,
  DELETED: undefined,
};

const GAME_STATUS_ICON: Record<GameStatus, LucideIcon> = {
  APPROVED: CheckCircle,
  PENDING: Clock,
  DRAFT: AlertCircle,
  REJECTED: Ban,
  CHANGES_REQUESTED: SquarePen,
  UNPUBLISHED: CircleHelp,
  PUBLISHED: CircleHelp,
  DELETED: CircleHelp,
};

const GAME_ALERT_STYLE: Record<GameStatus, string> = {
  APPROVED: 'border-green-500 bg-green-50 text-green-800',
  PENDING: 'border-yellow-500 bg-yellow-50 text-yellow-800',
  DRAFT: 'border-blue-500 bg-blue-50 text-blue-800',
  REJECTED: 'border-red-500 bg-red-50 text-red-800',
  CHANGES_REQUESTED: 'border-orange-500 bg-orange-50 text-orange-800',
  UNPUBLISHED: 'border-gray-500 bg-gray-50 text-gray-800',
  PUBLISHED: '',
  DELETED: '',
};

const GAME_ALERT_ICON_STROKE: Record<GameStatus, string> = {
  APPROVED: 'stroke-green-800',
  PENDING: 'stroke-yellow-800',
  DRAFT: 'stroke-blue-800',
  REJECTED: 'stroke-red-800',
  CHANGES_REQUESTED: 'stroke-orange-800',
  UNPUBLISHED: 'stroke-gray-800',
  PUBLISHED: '',
  DELETED: '',
};

export const VisibilityForm: React.FC<{
  team: NonNullable<TeamSelectedQuery>;
  game: NonNullable<TeamGamesReadQuery>;
}> = ({ game }) => {
  const router = useRouter();
  const { toast } = useToast();

  const utils = trpc.useUtils();
  const [animationsVisible, setAnimationsVisible] = React.useState(false);
  const submitForApproval = trpc.user.teams.games.status.update.useMutation();
  const changeVisibility =
    trpc.user.teams.games.visibility.update.useMutation();
  const deleteGame = trpc.user.teams.games.delete.useMutation();

  const form = useForm({
    resolver: zodResolver(visibilityFormSchema),
    defaultValues: {
      ...visibilityFormDefaultValues,
      visibility: game.visibility,
    },
  });

  const visibility = form.watch('visibility');

  const isDeleting = visibility === 'DELETE';
  const isEditable = game.status === 'APPROVED';

  const onChangeVisibility = async (data: VisibilityFormSchema) => {
    try {
      form.reset({
        ...visibilityFormDefaultValues,
        visibility: data.visibility,
      });

      if (data.visibility === 'DELETE') {
        await deleteGame.mutateAsync({
          gameId: game.id,
        });
        toast({
          title: 'Game deleted',
          description: 'Your game has been deleted.',
        });
        router.push(devRoutes.dashboard.url());
      } else {
        await changeVisibility.mutateAsync({
          gameId: game.id,
          visibility: data.visibility,
        });
        await utils.user.teams.games.read.invalidate({
          gameId: game.id,
        });
        toast({
          title: 'Visibility updated',
          description: 'Your game visibility has been updated.',
        });
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: parseTRPCClientErrorMessage(error),
        variant: 'destructive',
      });
    }
  };

  const onSubmitForApproval = async () => {
    try {
      await submitForApproval.mutateAsync({
        gameId: game.id,
      });
      await utils.user.teams.games.read.invalidate({
        gameId: game.id,
      });
      toast({
        title: 'Game submitted for approval',
        description: 'Your game has been submitted for approval.',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: parseTRPCClientErrorMessage(error),
        variant: 'destructive',
      });
    }
  };

  const AlertIcon = GAME_STATUS_ICON[game.status];

  return (
    <div className="relative">
      <SectionCardLayout
        title="Visibility"
        description="Set who can see your game. Use draft mode to work on your game without it being visible to the public."
      >
        <div className="space-y-4 -mt-2">
          <Alert
            variant="default"
            className={cn(GAME_ALERT_STYLE[game.status])}
          >
            {AlertIcon && (
              <AlertIcon
                className={cn('h-4 w-4', GAME_ALERT_ICON_STROKE[game.status])}
              />
            )}
            <AlertTitle>{GAME_STATUS_LABEL[game.status]}</AlertTitle>
            <AlertDescription>
              <div className="text-sm flex flex-col gap-4">
                {GAME_STATUS_ALERT[game.status]}
                {game.status === 'DRAFT' && (
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-fit border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white"
                      >
                        Submit for Approval
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogTitle>Submit for Approval</AlertDialogTitle>
                      <AlertDialogDescription>
                        The submission process requires a manual review and
                        might take up to 48 hours. Please verify that your
                        contact information is correct. We will notify you when
                        your submission is complete.
                      </AlertDialogDescription>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={onSubmitForApproval}>
                          Continue
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                )}
              </div>
            </AlertDescription>
          </Alert>

          <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onChangeVisibility)}>
              <FormField
                control={form.control}
                name="visibility"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Visibility</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className={cn('flex flex-col space-y-2')}
                      >
                        <LabeledRadioGroupItem
                          disabled={!isEditable}
                          value="PRIVATE"
                          id="PRIVATE"
                          label="Private"
                          description="Visible only to you and your team."
                        />
                        <LabeledRadioGroupItem
                          disabled={!isEditable}
                          value="UNLISTED"
                          id="UNLISTED"
                          label="Unlisted"
                          description="Anyone with the link can view it. Hidden from search."
                        />
                        <LabeledRadioGroupItem
                          disabled={!isEditable}
                          value="PUBLIC"
                          id="PUBLIC"
                          label="Public"
                          description="Visible to everyone. Appears in search, browse, and featured sections."
                        />
                        <LabeledRadioGroupItem
                          value="DELETE"
                          id="DELETE"
                          label="Delete"
                          description="Permanently delete this game. This action cannot be undone."
                          destructive
                        />
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <SubmissionDelayDialog
                isDeleting={isDeleting}
                onOpenChange={(setOpen) => {
                  setAnimationsVisible(setOpen);
                }}
                onContinue={() => {
                  form.handleSubmit(onChangeVisibility)();
                }}
              >
                <Button
                  type="button"
                  variant={isDeleting ? 'destructive' : 'default'}
                  className="mt-4"
                  disabled={
                    changeVisibility.isPending ||
                    deleteGame.isPending ||
                    !form.formState.isDirty
                  }
                  onClick={() => {
                    setAnimationsVisible(true);
                  }}
                >
                  {changeVisibility.isPending || deleteGame.isPending ? (
                    <LoaderCircle className="animate-spin h-4 w-4" />
                  ) : isDeleting ? (
                    <Trash2Icon className="h-4 w-4" />
                  ) : (
                    <Globe2 className="h-4 w-4" />
                  )}
                  {isDeleting
                    ? deleteGame.isPending
                      ? 'Deleting...'
                      : 'Delete'
                    : changeVisibility.isPending
                    ? 'Updating...'
                    : 'Update'}
                </Button>
              </SubmissionDelayDialog>
            </form>
          </FormProvider>
        </div>
      </SectionCardLayout>
      {animationsVisible && <StarryBackground />}
      {animationsVisible && <MeteorShowerCanvas />}
    </div>
  );
};

const LabeledRadioGroupItem: React.FC<{
  disabled?: boolean;
  value: string;
  id: string;
  label: string;
  description?: string;
  destructive?: boolean;
}> = ({ value, id, label, description, destructive, disabled }) => {
  return (
    <FormItem
      className={`flex items-center space-x-3 space-y-0 ${
        disabled && 'opacity-50'
      }`}
    >
      <div className="flex space-x-2">
        <FormControl>
          <RadioGroupItem
            disabled={disabled}
            value={value}
            id={id}
            className="mt-1.5"
          />
        </FormControl>
        <div>
          <Label
            htmlFor={id}
            className={cn(destructive ? 'text-destructive' : '')}
          >
            {label}
          </Label>
          <p
            className={cn(
              'text-xs',
              destructive ? 'text-destructive' : 'text-muted-foreground'
            )}
          >
            {description}
          </p>
        </div>
      </div>
    </FormItem>
  );
};

export const SubmissionDelayDialog: React.FC<{
  isDeleting?: boolean;
  children: React.ReactNode;
  onOpenChange: (open: boolean) => void;
  onContinue: () => void;
}> = ({ isDeleting, children, onOpenChange, onContinue }) => {
  return (
    <AlertDialog onOpenChange={onOpenChange}>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent className="border-none overflow-hidden z-[100]">
        <FreepikTooltip>
          <div className="m-auto aspect-square w-64 h-64 md:h-80 md:w-80 relative mb-4">
            <FillImage
              src={isDeleting ? '/art/astronaut-1.png' : '/art/astronaut-3.png'}
              alt="Astronaut - Designed by Freepik"
            />
          </div>
        </FreepikTooltip>
        <span className="absolute left-0 bottom-0 h-[6px] w-full bg-gradient-to-r from-yellow-400 via-pink-500 to-indigo-500 animate-pulse" />
        <AlertDialogHeader>
          <AlertDialogTitle className="text-2xl">
            {isDeleting ? 'Leaving this World' : 'Broadcasting to the World'}
          </AlertDialogTitle>

          {isDeleting ? (
            <AlertDialogDescription className="text-sm text-muted-foreground leading-relaxed">
              We're sorry to see you go. Deleting your game will remove it from
              our platform and it will no longer be accessible to anyone.
              <br />
              <br />
              <strong>There's no turning back.</strong>
              <br />
              <br />
              Deleting your game might take up to <strong>24 hours</strong> to
              propagate across our network's edge caches and content delivery
              nodes orbiting the web.
              <br />
              <br />
              <em className="block italic text-xs text-center sm:text-right text-muted-foreground mt-2">
                "I'm not saying goodbye, I'm just taking a break from the
                universe." - Astronaut
              </em>
            </AlertDialogDescription>
          ) : (
            <AlertDialogDescription className="text-sm text-muted-foreground leading-relaxed">
              Changing your game's visibility will trigger an update across our
              network's edge caches and content delivery nodes orbiting the web.
              <br />
              <br />
              While changes usually propagate quickly, they might take up to{' '}
              <strong>24 hours</strong> to fully sync across the globe.
              <br />
              <br />
              <em className="block italic text-xs text-center sm:text-right text-muted-foreground mt-2">
                "The web is fast, but even stars take time to shine." -
                Astronaut
              </em>
            </AlertDialogDescription>
          )}
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="bg-gray-200 hover:bg-gray-300">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={onContinue}
            className={cn(
              isDeleting
                ? 'bg-red-600 hover:bg-red-700 text-white'
                : 'bg-indigo-600 hover:bg-indigo-700 text-white'
            )}
          >
            {isDeleting ? 'Delete' : 'Continue'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
