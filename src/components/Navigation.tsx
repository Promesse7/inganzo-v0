import { Button } from "@/components/ui/button";
import { Heart, BookOpen, Upload, Info, LogIn, Menu, Trophy, User } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const Navigation = () => {
  const { user } = useAuth();

  return (
    <nav className="bg-card/95 backdrop-blur-sm border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            <Heart className="h-8 w-8 text-accent" />
            <span className="text-2xl font-bold text-primary">INGANZO</span>
          </div>

          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-foreground hover:text-accent transition-colors font-medium">
              Home
            </Link>
            <Link to="/lessons" className="text-foreground hover:text-accent transition-colors font-medium">
              Lessons
            </Link>
            <Link to="/stories" className="text-foreground hover:text-accent transition-colors font-medium">
              Stories
            </Link>
            <Link to="/leaderboard" className="text-foreground hover:text-accent transition-colors font-medium">
              <Trophy className="h-4 w-4 inline mr-1" />
              Leaderboard
            </Link>
            <Link to="/about" className="text-foreground hover:text-accent transition-colors font-medium">
              About
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-3">
            {user ? (
              <>
                <Link to="/upload">
                  <Button variant="outline" size="sm">
                    <Upload className="h-4 w-4 mr-2" />
                    Upload
                  </Button>
                </Link>
                <Link to="/profile">
                  <Button variant="ghost" size="sm">
                    <Avatar className="h-6 w-6 mr-2">
                      <AvatarFallback className="text-xs">
                        <User className="h-3 w-3" />
                      </AvatarFallback>
                    </Avatar>
                    Profile
                  </Button>
                </Link>
              </>
            ) : (
              <Link to="/login">
                <Button variant="outline" size="sm">
                  <LogIn className="h-4 w-4 mr-2" />
                  Login
                </Button>
              </Link>
            )}
          </div>

          <Button variant="ghost" size="sm" className="md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;