import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { useAuth } from '@/contexts/AuthContext';
import { usersService } from '@/services/users';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Loader2, Trophy, Star, Zap, Award } from 'lucide-react';

const Profile = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    loadProfile();
  }, [user]);

  const loadProfile = async () => {
    if (!user) return;

    try {
      setLoading(true);
      const data = await usersService.getProfile(user.id);
      setProfile(data);
    } catch (error) {
      console.error('Error loading profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="flex justify-center items-center h-screen">
          <Loader2 className="w-8 h-8 animate-spin" />
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-bold mb-4">Profile not found</h1>
          <Button onClick={() => navigate('/')}>Go Home</Button>
        </div>
      </div>
    );
  }

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common':
        return 'bg-gray-500';
      case 'rare':
        return 'bg-blue-500';
      case 'epic':
        return 'bg-purple-500';
      case 'legendary':
        return 'bg-yellow-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="container mx-auto px-4 py-8 mt-20">
        <div className="max-w-6xl mx-auto">
          <Card className="mb-8">
            <CardHeader>
              <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                <Avatar className="w-24 h-24">
                  <AvatarImage src={profile.avatar_url} />
                  <AvatarFallback className="text-2xl">
                    {getInitials(profile.display_name || user?.email || 'U')}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <CardTitle className="text-3xl mb-2">
                    {profile.display_name || user?.email}
                  </CardTitle>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <Badge variant="secondary" className="capitalize">
                      {profile.role}
                    </Badge>
                    <Badge variant="outline">
                      <Zap className="w-3 h-3 mr-1" />
                      {profile.points} Points
                    </Badge>
                    <Badge variant="outline">
                      <Star className="w-3 h-3 mr-1" />
                      Trust Score: {profile.trust_score}
                    </Badge>
                  </div>
                </div>
                <Button variant="outline" onClick={handleSignOut}>
                  Sign Out
                </Button>
              </div>
            </CardHeader>
          </Card>

          <Tabs defaultValue="badges" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="badges">Badges</TabsTrigger>
              <TabsTrigger value="activity">Recent Activity</TabsTrigger>
              <TabsTrigger value="stats">Statistics</TabsTrigger>
            </TabsList>

            <TabsContent value="badges" className="space-y-4">
              {profile.badges && profile.badges.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {profile.badges.map((userBadge: any) => (
                    <Card key={userBadge.id}>
                      <CardHeader>
                        <div className="flex items-start gap-4">
                          <div
                            className={`w-16 h-16 rounded-full ${getRarityColor(
                              userBadge.badges.rarity
                            )} flex items-center justify-center`}
                          >
                            <Award className="w-8 h-8 text-white" />
                          </div>
                          <div className="flex-1">
                            <CardTitle className="text-lg">
                              {userBadge.badges.name}
                            </CardTitle>
                            <Badge variant="outline" className="text-xs capitalize mt-1">
                              {userBadge.badges.rarity}
                            </Badge>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <CardDescription>{userBadge.badges.description}</CardDescription>
                        <p className="text-xs text-muted-foreground mt-2">
                          Earned {new Date(userBadge.earned_at).toLocaleDateString()}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card>
                  <CardContent className="text-center py-12">
                    <Trophy className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                    <p className="text-lg mb-2">No badges yet</p>
                    <p className="text-muted-foreground mb-4">
                      Complete lessons and quizzes to earn badges
                    </p>
                    <Button onClick={() => navigate('/lessons')}>Start Learning</Button>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="activity" className="space-y-4">
              {profile.recentSessions && profile.recentSessions.length > 0 ? (
                <div className="space-y-3">
                  {profile.recentSessions.map((session: any) => (
                    <Card key={session.id}>
                      <CardContent className="py-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Quiz Completed</p>
                            <p className="text-sm text-muted-foreground">
                              Score: {session.score}% • {session.total_points} points
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">
                              {new Date(session.completed_at).toLocaleString()}
                            </p>
                          </div>
                          {session.streak_count > 1 && (
                            <Badge>🔥 {session.streak_count} streak</Badge>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card>
                  <CardContent className="text-center py-12">
                    <p className="text-muted-foreground">No recent activity</p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="stats" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Total Points</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-4xl font-bold">{profile.points}</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Badges Earned</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-4xl font-bold">{profile.badges?.length || 0}</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Quizzes Completed</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-4xl font-bold">
                      {profile.recentSessions?.length || 0}
                    </p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Profile;
