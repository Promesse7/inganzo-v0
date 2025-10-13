import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Play, Upload, Users, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-elder.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background with overlay */}
      <div className="absolute inset-0">
        <img 
          src={heroImage} 
          alt="Wise Rwandan elder sharing wisdom" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-primary/40"></div>
        <div className="absolute inset-0 pattern-imigongo"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4">
        <div className="max-w-4xl">
          <div className="mb-6">
            <span className="inline-block px-4 py-2 bg-accent/20 text-accent font-medium rounded-full border border-accent/30 mb-4">
              Preserving Rwandan Heritage
            </span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Let's Remember,<br />
            Let's Learn,<br />
            <span className="text-accent">Let's Pass It On</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl leading-relaxed">
            Twibuke is a living archive of Rwandan wisdom — told by the voices that lived it. 
            Connect with elders, preserve stories, and honor our shared heritage.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <Link to="/stories">
              <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-golden">
                <Play className="h-5 w-5 mr-2" />
                Explore Stories
              </Button>
            </Link>
            <Link to="/upload">
              <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10">
                <Upload className="h-5 w-5 mr-2" />
                Share Your Wisdom
              </Button>
            </Link>
          </div>
          
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl">
            <Card className="bg-white/10 backdrop-blur border-white/20 animate-fall-in" style={{ animationDelay: '0.5s' }}>
              <CardContent className="p-4 text-center">
                <Users className="h-8 w-8 text-accent mx-auto mb-2 animate-float" />
                <div className="text-2xl font-bold text-white">500+</div>
                <div className="text-white/80 text-sm">Community Members</div>
              </CardContent>
            </Card>
            
            <Card className="bg-white/10 backdrop-blur border-white/20 animate-fall-in" style={{ animationDelay: '0.7s' }}>
              <CardContent className="p-4 text-center">
                <Heart className="h-8 w-8 text-accent mx-auto mb-2 animate-float" style={{ animationDelay: '1s' }} />
                <div className="text-2xl font-bold text-white">200+</div>
                <div className="text-white/80 text-sm">Stories Preserved</div>
              </CardContent>
            </Card>
            
            <Card className="bg-white/10 backdrop-blur border-white/20 animate-fall-in" style={{ animationDelay: '0.9s' }}>
              <CardContent className="p-4 text-center">
                <Play className="h-8 w-8 text-accent mx-auto mb-2 animate-float" style={{ animationDelay: '2s' }} />
                <div className="text-2xl font-bold text-white">1000+</div>
                <div className="text-white/80 text-sm">Hours of Wisdom</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;