import NavBar from "@/components/ui/NavBar";
import Footer from "@/components/ui/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Play, Search, Filter, Heart, Clock, User } from "lucide-react";

const Stories = () => {
  const stories = [
    {
      id: 1,
      title: "The Wisdom of Umuganda",
      elder: "Mama Mukamana, 78",
      region: "Kigali",
      duration: "12:30",
      category: "Traditions",
      description: "How community work brought us together and taught us the value of unity.",
      image: "/api/placeholder/300/200"
    },
    {
      id: 2,
      title: "Ancient Proverbs for Modern Times",
      elder: "Papa Ndahayo, 82",
      region: "Huye",
      duration: "8:45",
      category: "Proverbs",
      description: "Timeless Rwandan sayings that guide us through life's challenges.",
      image: "/api/placeholder/300/200"
    },
    {
      id: 3,
      title: "Traditional Wedding Songs",
      elder: "Mama Uwimana, 69",
      region: "Musanze",
      duration: "15:20",
      category: "Songs",
      description: "Beautiful songs that celebrated love and family in traditional ceremonies.",
      image: "/api/placeholder/300/200"
    },
    {
      id: 4,
      title: "The Art of Basketry",
      elder: "Mama Nyirahabimana, 75",
      region: "Nyanza",
      duration: "20:15",
      category: "Crafts",
      description: "Learning the intricate patterns and meanings behind traditional Rwandan baskets.",
      image: "/api/placeholder/300/200"
    },
    {
      id: 5,
      title: "Stories from the Hills",
      elder: "Papa Nkurunziza, 80",
      region: "Gicumbi",
      duration: "18:30",
      category: "Stories",
      description: "Tales of courage and wisdom from Rwanda's beautiful thousand hills.",
      image: "/api/placeholder/300/200"
    },
    {
      id: 6,
      title: "Cooking with Love",
      elder: "Mama Ingabire, 71",
      region: "Rubavu",
      duration: "14:45",
      category: "Recipes",
      description: "Traditional recipes passed down through generations, cooked with love.",
      image: "/api/placeholder/300/200"
    }
  ];

  const categories = ["All", "Traditions", "Proverbs", "Songs", "Crafts", "Stories", "Recipes"];

  return (
    <div className="min-h-screen bg-background">
      <NavBar />
      
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-primary to-primary/80 text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Story Library
            </h1>
            <p className="text-xl opacity-90 mb-8">
              Discover the rich tapestry of Rwandan wisdom through stories, proverbs, 
              songs, and traditions shared by our beloved elders.
            </p>
            
            {/* Search Bar */}
            <div className="relative max-w-md mx-auto mb-8">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search stories, elders, or topics..."
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-white/20 bg-white/10 backdrop-blur text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category, index) => (
              <Button
                key={category}
                variant={index === 0 ? "default" : "outline"}
                size="sm"
                className={`animate-fall-in ${index === 0 ? 'bg-accent text-accent-foreground' : ''}`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Stories Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {stories.map((story, index) => (
              <Card 
                key={story.id} 
                className="shadow-traditional hover:shadow-golden transition-all duration-500 hover:-translate-y-2 animate-fall-in group cursor-pointer"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative overflow-hidden rounded-t-lg">
                  <img 
                    src={story.image} 
                    alt={story.title}
                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute top-4 right-4 bg-accent text-accent-foreground px-2 py-1 rounded-full text-sm font-medium">
                    {story.category}
                  </div>
                  <div className="absolute bottom-4 left-4 bg-black/50 backdrop-blur text-white px-2 py-1 rounded-full text-sm flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    {story.duration}
                  </div>
                </div>
                
                <CardHeader>
                  <CardTitle className="text-xl text-primary group-hover:text-accent transition-colors">
                    {story.title}
                  </CardTitle>
                  <div className="flex items-center text-muted-foreground text-sm">
                    <User className="h-4 w-4 mr-1" />
                    {story.elder} • {story.region}
                  </div>
                </CardHeader>
                
                <CardContent>
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    {story.description}
                  </p>
                  <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
                    <Play className="h-4 w-4 mr-2" />
                    Watch Story
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {/* Load More */}
          <div className="text-center mt-12">
            <Button size="lg" variant="outline" className="hover:bg-accent hover:text-accent-foreground">
              Load More Stories
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Stories;