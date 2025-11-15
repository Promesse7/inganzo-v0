import NavBar from "@/components/ui/NavBar";
import Footer from "@/components/ui/Footer";
import AvatarWithBadge from "@/components/ui/AvatarWithBadge";
import BadgeList from "@/components/ui/BadgeList";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { Copy, LogOut, Share2, Trophy, BookOpen, Award } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  // Mock data - replace with real data from Firestore
  const stats = {
    points: 1250,
    quizzesCompleted: 18,
    badges: ["First Quiz", "Perfect Score", "Week Warrior", "History Master"],
    level: "intermediate" as const,
    recentActivity: [
      { type: "quiz", title: "Precolonial Societies", points: 85, date: "2024-01-15" },
      { type: "quiz", title: "Colonial Administration", points: 92, date: "2024-01-14" },
    ]
  };

  const handleCopyProfile = () => {
    const profileUrl = `${window.location.origin}/profile/${user?.uid || 'guest'}`;
    navigator.clipboard.writeText(profileUrl);
    // Show toast notification
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: "My INGANZO Profile",
        text: `Check out my progress on INGANZO! ${stats.points} points earned.`,
        url: window.location.href,
      });
    } else {
      handleCopyProfile();
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <NavBar />
      
      <section className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Profile Header */}
          <Card className="mb-6 shadow-traditional">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                <AvatarWithBadge level={stats.level} />
                <div className="flex-1 text-center md:text-left">
                  <h1 className="text-3xl font-bold text-primary mb-2">
                    {user?.displayName || user?.email || "Guest User"}
                  </h1>
                  <p className="text-muted-foreground mb-4">
                    {user?.email || "Login to sync your progress"}
                  </p>
                  <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                    <Button variant="outline" size="sm" onClick={handleCopyProfile}>
                      <Copy className="h-4 w-4 mr-2" />
                      Copy Link
                    </Button>
                    <Button variant="outline" size="sm" onClick={handleShare}>
                      <Share2 className="h-4 w-4 mr-2" />
                      Share
                    </Button>
                    {user && (
                      <Button variant="outline" size="sm" onClick={() => {/* logout */}}>
                        <LogOut className="h-4 w-4 mr-2" />
                        Logout
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <Card className="shadow-traditional">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-accent" />
                  Points
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-primary">{stats.points}</div>
                <p className="text-sm text-muted-foreground mt-1">Total points earned</p>
              </CardContent>
            </Card>

            <Card className="shadow-traditional">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-accent" />
                  Quizzes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-primary">{stats.quizzesCompleted}</div>
                <p className="text-sm text-muted-foreground mt-1">Quizzes completed</p>
              </CardContent>
            </Card>

            <Card className="shadow-traditional">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-accent" />
                  Badges
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-primary">{stats.badges.length}</div>
                <p className="text-sm text-muted-foreground mt-1">Badges unlocked</p>
              </CardContent>
            </Card>
          </div>

          {/* Badges Section */}
          <Card className="mb-6 shadow-traditional">
            <CardHeader>
              <CardTitle>Badges</CardTitle>
            </CardHeader>
            <CardContent>
              <BadgeList badges={stats.badges} />
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className="shadow-traditional">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              {stats.recentActivity.length === 0 ? (
                <p className="text-muted-foreground text-center py-4">
                  No activity yet. Start taking quizzes to see your progress!
                </p>
              ) : (
                <div className="space-y-4">
                  {stats.recentActivity.map((activity, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 rounded-lg border">
                      <div>
                        <div className="font-semibold">{activity.title}</div>
                        <div className="text-sm text-muted-foreground">{activity.date}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-accent">{activity.points} pts</div>
                        <div className="text-xs text-muted-foreground">Score</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Profile;

