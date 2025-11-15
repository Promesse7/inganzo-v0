import NavBar from "@/components/ui/NavBar";
import Footer from "@/components/ui/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import LessonCard from "@/components/lesson/LessonCard";
import { lessons } from "@/lib/mockData";
import { useNavigate } from "react-router-dom";
import { Sparkles, BookOpen, Zap, TrendingUp } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Animated background gradient */}
      <div className="fixed inset-0 bg-gradient-to-br from-background via-background to-primary/5 -z-10" />
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(34,197,94,0.1),transparent_50%)] -z-10" />
      
      <NavBar />
      
      {/* Hero Section - Modern & Futuristic */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-accent/20 animate-pulse-slow" />
        
        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-8 fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-primary/20 mb-4 animate-fade-in">
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">Learn Rwanda's History</span>
            </div>
            
            <h1 className="text-6xl md:text-8xl font-bold tracking-tight">
              <span className="gradient-text">INGANZO</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Interactive lessons, engaging quizzes, and community stories. 
              <br />
              <span className="text-foreground font-medium">Learn Rwanda's rich history, one lesson at a time.</span>
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
              <Button 
                size="lg" 
                className="group relative overflow-hidden bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white px-8 py-6 text-lg font-semibold rounded-2xl shadow-lg shadow-primary/50 hover:shadow-xl hover:shadow-primary/60 transition-all duration-300 hover:scale-105"
                onClick={() => navigate("/stories")}
              >
                <span className="relative z-10 flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  Start Learning
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-accent to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Button>
              
              <Button 
                size="lg" 
                variant="outline"
                className="px-8 py-6 text-lg font-semibold rounded-2xl border-2 hover:bg-accent/10 hover:border-accent transition-all duration-300"
                onClick={() => navigate("/upload")}
              >
                Contribute
              </Button>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-12 max-w-2xl mx-auto">
              <div className="space-y-2 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                <div className="text-3xl font-bold gradient-text">500+</div>
                <div className="text-sm text-muted-foreground">Lessons</div>
              </div>
              <div className="space-y-2 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                <div className="text-3xl font-bold gradient-text">10K+</div>
                <div className="text-sm text-muted-foreground">Learners</div>
              </div>
              <div className="space-y-2 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                <div className="text-3xl font-bold gradient-text">95%</div>
                <div className="text-sm text-muted-foreground">Satisfaction</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Lessons Section */}
      <section className="container mx-auto px-4 py-20 relative">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-3">
              Featured <span className="gradient-text">Lessons</span>
            </h2>
            <p className="text-muted-foreground text-lg">Explore our curated collection</p>
          </div>
          <Button 
            variant="ghost" 
            className="hidden md:flex items-center gap-2"
            onClick={() => navigate("/stories")}
          >
            View All
            <TrendingUp className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {lessons.map((lesson, index) => (
            <div 
              key={lesson.id}
              className="animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <LessonCard lesson={lesson} onOpen={(id) => navigate(`/quiz/${id}`)} />
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 pb-20">
        <Card className="glass-dark border-primary/20 overflow-hidden relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <CardContent className="p-8 md:p-12 relative z-10">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-primary mb-2">
                  <Zap className="h-5 w-5" />
                  <span className="text-sm font-semibold">CONTRIBUTE</span>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold">Share Your Story</h3>
                <p className="text-muted-foreground max-w-md">
                  Help preserve Rwanda's history by sharing audio, video, or text testimonies for others to learn from.
                </p>
              </div>
              <Button 
                size="lg"
                className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white px-8 py-6 rounded-2xl shadow-lg shadow-primary/50 hover:shadow-xl hover:shadow-primary/60 transition-all duration-300 hover:scale-105"
                onClick={() => navigate("/upload")}
              >
                Upload Testimony
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
