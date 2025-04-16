'use client';

import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Button } from '../ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card';
import { Badge } from '../ui/badge';
import { Tabs, TabsList, TabsTrigger } from '../ui/tabs';
import { MessageSquare, ThumbsUp } from 'lucide-react';
import { useState } from 'react';

// Mock data for feedback
const feedbackData = [
  {
    id: '1',
    gameId: '1',
    gameTitle: 'Space Explorer',
    user: {
      name: 'Alex Johnson',
      avatar: '/placeholder.svg?height=40&width=40',
      initials: 'AJ',
    },
    comment:
      'Really enjoyed the game! The controls are intuitive and the graphics are amazing. Would love to see more levels in the future.',
    rating: 5,
    date: '2023-05-15',
    isRead: true,
  },
  {
    id: '2',
    gameId: '1',
    gameTitle: 'Space Explorer',
    user: {
      name: 'Sam Wilson',
      avatar: '/placeholder.svg?height=40&width=40',
      initials: 'SW',
    },
    comment:
      'Found a bug in level 3 where the character gets stuck in the corner. Otherwise, great game!',
    rating: 4,
    date: '2023-05-14',
    isRead: false,
  },
  {
    id: '3',
    gameId: '3',
    gameTitle: 'Racing Legends',
    user: {
      name: 'Taylor Kim',
      avatar: '/placeholder.svg?height=40&width=40',
      initials: 'TK',
    },
    comment:
      'The racing mechanics are fantastic! Would be great to have more car customization options.',
    rating: 4,
    date: '2023-05-12',
    isRead: true,
  },
  {
    id: '4',
    gameId: '1',
    gameTitle: 'Space Explorer',
    user: {
      name: 'Jordan Lee',
      avatar: '/placeholder.svg?height=40&width=40',
      initials: 'JL',
    },
    comment:
      "This game is addictive! I've been playing for hours. The soundtrack is perfect for the space theme.",
    rating: 5,
    date: '2023-05-10',
    isRead: true,
  },
];

type FeedbackFilter = 'all' | 'unread' | 'game';

export function FeedbackList({ gameId }: { gameId?: string }) {
  const [filter, setFilter] = useState<FeedbackFilter>(gameId ? 'game' : 'all');

  // Filter feedback based on the selected filter
  const filteredFeedback = feedbackData.filter((feedback) => {
    if (filter === 'unread') return !feedback.isRead;
    if (filter === 'game' && gameId) return feedback.gameId === gameId;
    return true;
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Player Feedback</CardTitle>
        <CardDescription>
          See what players are saying about your games
        </CardDescription>
        {!gameId && (
          <Tabs
            value={filter}
            onValueChange={(v) => setFilter(v as FeedbackFilter)}
            className="mt-2"
          >
            <TabsList>
              <TabsTrigger value="all">All Feedback</TabsTrigger>
              <TabsTrigger value="unread">
                Unread
                <Badge variant="secondary" className="ml-2">
                  {feedbackData.filter((f) => !f.isRead).length}
                </Badge>
              </TabsTrigger>
            </TabsList>
          </Tabs>
        )}
      </CardHeader>
      <CardContent className="space-y-4">
        {filteredFeedback.length > 0 ? (
          filteredFeedback.map((feedback) => (
            <div
              key={feedback.id}
              className={`p-4 rounded-lg border ${
                !feedback.isRead ? 'bg-primary/5 border-primary/20' : ''
              }`}
            >
              <div className="flex items-start gap-4">
                <Avatar>
                  <AvatarImage
                    src={feedback.user.avatar || '/placeholder.svg'}
                    alt={feedback.user.name}
                  />
                  <AvatarFallback>{feedback.user.initials}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium">{feedback.user.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        {feedback.date} • {feedback.gameTitle}
                      </p>
                    </div>
                    <div className="flex items-center">
                      <div className="flex items-center mr-2">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <ThumbsUp
                            key={i}
                            className={`h-4 w-4 ${
                              i < feedback.rating
                                ? 'text-primary fill-primary'
                                : 'text-muted-foreground'
                            }`}
                          />
                        ))}
                      </div>
                      {!feedback.isRead && (
                        <Badge className="bg-primary">New</Badge>
                      )}
                    </div>
                  </div>
                  <p className="mt-2">{feedback.comment}</p>
                  <div className="mt-2 flex justify-end">
                    <Button variant="ghost" size="sm">
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Reply
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <MessageSquare className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold mb-2">No feedback yet</h3>
            <p className="text-muted-foreground max-w-md">
              When players leave comments or ratings on your games, they will
              appear here.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
