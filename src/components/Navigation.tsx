import { Button } from "@/components/ui/button";
import { Heart, BookOpen, Upload, Info, LogIn, Menu } from "lucide-react";
import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    <nav className="bg-card/95 backdrop-blur-sm border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <Heart className="h-8 w-8 text-accent" />
            <span className="text-2xl font-bold text-primary">TWIBUKE</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-foreground hover:text-accent transition-colors font-medium">
              Home
            </Link>
            <Link to="/stories" className="text-foreground hover:text-accent transition-colors font-medium">
              Story Library
            </Link>
            <Link to="/upload" className="text-foreground hover:text-accent transition-colors font-medium">
              Upload
            </Link>
            <Link to="/about" className="text-foreground hover:text-accent transition-colors font-medium">
              About
            </Link>
          </div>

          {/* Action Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            <Link to="/login">
              <Button variant="outline" size="sm">
                <LogIn className="h-4 w-4 mr-2" />
                Login
              </Button>
            </Link>
            <Link to="/upload">
              <Button size="sm" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                Start Contributing
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <Button variant="ghost" size="sm" className="md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;