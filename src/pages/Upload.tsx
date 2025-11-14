import NavBar from "@/components/ui/NavBar";
import Footer from "@/components/ui/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Upload, Video, Mic, FileText, Heart, Camera } from "lucide-react";

const UploadPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <NavBar />
      
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-warm to-warm/80 text-warm-foreground">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Share Your Wisdom
            </h1>
            <p className="text-xl opacity-90 mb-8">
              Your stories, knowledge, and experiences are precious gifts for future generations. 
              Help us preserve the beautiful heritage of Rwanda.
            </p>
          </div>
        </div>
      </section>

      {/* Upload Form */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Upload Options */}
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-primary mb-8">Choose Your Method</h2>
              
              <Card className="shadow-traditional hover:shadow-golden transition-all duration-500 animate-fall-in group cursor-pointer">
                <CardContent className="p-6 text-center">
                  <Video className="h-12 w-12 text-accent mx-auto mb-4 group-hover:animate-gentle-bounce" />
                  <h3 className="text-xl font-semibold mb-2">Video Recording</h3>
                  <p className="text-muted-foreground mb-4">
                    Record yourself telling stories or demonstrating traditions
                  </p>
                  <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Video
                  </Button>
                </CardContent>
              </Card>

              <Card className="shadow-traditional hover:shadow-golden transition-all duration-500 animate-fall-in group cursor-pointer" style={{ animationDelay: '0.2s' }}>
                <CardContent className="p-6 text-center">
                  <Mic className="h-12 w-12 text-accent mx-auto mb-4 group-hover:animate-gentle-bounce" />
                  <h3 className="text-xl font-semibold mb-2">Audio Recording</h3>
                  <p className="text-muted-foreground mb-4">
                    Share songs, proverbs, or spoken stories and wisdom
                  </p>
                  <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Audio
                  </Button>
                </CardContent>
              </Card>

              <Card className="shadow-traditional hover:shadow-golden transition-all duration-500 animate-fall-in group cursor-pointer" style={{ animationDelay: '0.4s' }}>
                <CardContent className="p-6 text-center">
                  <FileText className="h-12 w-12 text-accent mx-auto mb-4 group-hover:animate-gentle-bounce" />
                  <h3 className="text-xl font-semibold mb-2">Written Stories</h3>
                  <p className="text-muted-foreground mb-4">
                    Write down proverbs, recipes, or family stories
                  </p>
                  <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
                    <FileText className="h-4 w-4 mr-2" />
                    Write Story
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Information Form */}
            <div className="animate-fade-in" style={{ animationDelay: '0.6s' }}>
              <h2 className="text-3xl font-bold text-primary mb-8">Tell Us About You</h2>
              
              <Card className="shadow-traditional">
                <CardContent className="p-6">
                  <form className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName">First Name</Label>
                        <Input id="firstName" placeholder="Your first name" />
                      </div>
                      <div>
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input id="lastName" placeholder="Your last name" />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="age">Age</Label>
                        <Input id="age" type="number" placeholder="Your age" />
                      </div>
                      <div>
                        <Label htmlFor="region">Region</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select your region" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="kigali">Kigali</SelectItem>
                            <SelectItem value="huye">Huye</SelectItem>
                            <SelectItem value="musanze">Musanze</SelectItem>
                            <SelectItem value="nyanza">Nyanza</SelectItem>
                            <SelectItem value="rubavu">Rubavu</SelectItem>
                            <SelectItem value="gicumbi">Gicumbi</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="category">Story Category</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="What type of wisdom are you sharing?" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="traditions">Traditions</SelectItem>
                          <SelectItem value="proverbs">Proverbs</SelectItem>
                          <SelectItem value="songs">Songs</SelectItem>
                          <SelectItem value="crafts">Crafts</SelectItem>
                          <SelectItem value="stories">Life Stories</SelectItem>
                          <SelectItem value="recipes">Recipes</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="title">Story Title</Label>
                      <Input id="title" placeholder="Give your story a meaningful title" />
                    </div>

                    <div>
                      <Label htmlFor="description">Description</Label>
                      <Textarea 
                        id="description" 
                        placeholder="Describe what wisdom you want to share..."
                        rows={4}
                      />
                    </div>

                    <div>
                      <Label htmlFor="language">Primary Language</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select language" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="kinyarwanda">Kinyarwanda</SelectItem>
                          <SelectItem value="english">English</SelectItem>
                          <SelectItem value="french">French</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
                      <Heart className="h-4 w-4 mr-2" />
                      Submit Your Wisdom
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Guidelines */}
          <Card className="mt-12 bg-secondary/50 animate-fade-in" style={{ animationDelay: '0.8s' }}>
            <CardHeader>
              <CardTitle className="text-xl text-primary flex items-center">
                <Heart className="h-5 w-5 mr-2 text-accent" />
                Guidelines for Sharing
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-muted-foreground">
                <div>
                  <h4 className="font-semibold text-primary mb-2">What to Share</h4>
                  <ul className="space-y-1 text-sm">
                    <li>• Traditional stories and folklore</li>
                    <li>• Family recipes and cooking methods</li>
                    <li>• Cultural proverbs and their meanings</li>
                    <li>• Traditional songs and dances</li>
                    <li>• Craft techniques and skills</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-primary mb-2">Tips for Recording</h4>
                  <ul className="space-y-1 text-sm">
                    <li>• Speak clearly and at a comfortable pace</li>
                    <li>• Find a quiet environment</li>
                    <li>• Share personal experiences and memories</li>
                    <li>• Explain cultural context when helpful</li>
                    <li>• Be authentic - your voice matters</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default UploadPage;