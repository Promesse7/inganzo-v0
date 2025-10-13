import { useState, useEffect } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { usersService } from '@/services/users';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Loader2, Trophy, Medal, Award } from 'lucide-react';

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('overall');

  useEffect(() => {
    loadLeaderboard();
  }, [category]);

  const loadLeaderboard = async () => {
    try {
      setLoading(true);
      const data = await usersService.getLeaderboard(category);
      setLeaderboard(data || []);
    } catch (error) {
      console.error('Error loading leaderboard:', error);
    } finally {
      setLoading(false);
    }
  };

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="w-6 h-6 text-yellow-500" />;
      case 2:
        return <Medal className="w-6 h-6 text-gray-400" />;
      case 3:
        return <Award className="w-6 h-6 text-amber-600" />;
      default:
        return <div className="w-6 h-6 flex items-center justify-center font-bold">{rank}</div>;
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="container mx-auto px-4 py-8 mt-20">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8 text-center">
            <h1 className="text-4xl font-bold mb-4">Leaderboard</h1>
            <p className="text-lg text-muted-foreground">
              See how you rank against other learners
            </p>
          </div>

          <Tabs value={category} onValueChange={setCategory} className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="overall">All Time</TabsTrigger>
              <TabsTrigger value="monthly">This Month</TabsTrigger>
              <TabsTrigger value="weekly">This Week</TabsTrigger>
            </TabsList>

            <TabsContent value={category}>
              {loading ? (
                <div className="flex justify-center items-center py-20">
                  <Loader2 className="w-8 h-8 animate-spin" />
                </div>
              ) : leaderboard.length > 0 ? (
                <div className="space-y-3">
                  {leaderboard.slice(0, 3).map((entry, index) => (
                    <Card
                      key={entry.id}
                      className="border-2 border-primary/20 bg-gradient-to-r from-primary/5 to-transparent"
                    >
                      <CardContent className="py-6">
                        <div className="flex items-center gap-4">
                          <div className="flex-shrink-0">{getRankIcon(index + 1)}</div>
                          <Avatar className="w-12 h-12">
                            <AvatarImage src={entry.users?.avatar_url} />
                            <AvatarFallback>
                              {getInitials(entry.users?.display_name || 'U')}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <p className="font-semibold truncate">
                              {entry.users?.display_name || 'Anonymous'}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              Rank #{index + 1}
                            </p>
                          </div>
                          <Badge className="text-lg px-4 py-2">{entry.points} pts</Badge>
                        </div>
                      </CardContent>
                    </Card>
                  ))}

                  {leaderboard.slice(3).map((entry, index) => (
                    <Card key={entry.id}>
                      <CardContent className="py-4">
                        <div className="flex items-center gap-4">
                          <div className="flex-shrink-0 w-6 text-center font-bold text-muted-foreground">
                            {index + 4}
                          </div>
                          <Avatar className="w-10 h-10">
                            <AvatarImage src={entry.users?.avatar_url} />
                            <AvatarFallback>
                              {getInitials(entry.users?.display_name || 'U')}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium truncate">
                              {entry.users?.display_name || 'Anonymous'}
                            </p>
                          </div>
                          <Badge variant="outline">{entry.points} pts</Badge>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card>
                  <CardContent className="text-center py-12">
                    <Trophy className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                    <p className="text-lg mb-2">No rankings yet</p>
                    <p className="text-muted-foreground">
                      Be the first to complete lessons and earn points!
                    </p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Leaderboard;
