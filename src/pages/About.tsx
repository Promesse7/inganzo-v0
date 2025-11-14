import NavBar from "@/components/ui/NavBar";
import Footer from "@/components/ui/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, Users, Target, Award, MapPin, Mail } from "lucide-react";

const About = () => {
  const teamMembers = [
    {
      name: "Mama Uwimana",
      role: "Community Elder & Advisor",
      region: "Kigali",
      description: "Guiding our mission with 70 years of wisdom and cultural knowledge."
    },
    {
      name: "Jean Baptiste",
      role: "Cultural Preservation Director",
      region: "Huye",
      description: "Dedicated to documenting and preserving Rwandan heritage for future generations."
    },
    {
      name: "Marie Claire",
      role: "Youth Engagement Coordinator",
      region: "Musanze",
      description: "Connecting young people with their cultural roots through technology."
    }
  ];

  const milestones = [
    {
      year: "2023",
      title: "Platform Launch",
      description: "TWIBUKE was born from a vision to preserve disappearing wisdom."
    },
    {
      year: "2024",
      title: "First 100 Stories",
      description: "Reached our first milestone of 100 preserved stories from elders."
    },
    {
      year: "2024",
      title: "School Partnerships",
      description: "Began working with schools to integrate cultural education."
    },
    {
      year: "2024",
      title: "500+ Community Members",
      description: "Our community grew to over 500 active participants."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <NavBar />
      
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-success to-success/80 text-success-foreground">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              About TWIBUKE
            </h1>
            <p className="text-xl opacity-90 mb-8">
              "Twibuke" means "Let's Remember" in Kinyarwanda. We are on a mission to ensure 
              that the wisdom of Rwanda's elders lives on forever.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            <Card className="shadow-traditional animate-fall-in">
              <CardHeader>
                <CardTitle className="text-2xl text-primary flex items-center">
                  <Target className="h-6 w-6 mr-3 text-accent" />
                  Our Mission
                </CardTitle>
              </CardHeader>
              <CardContent className="text-lg leading-relaxed text-muted-foreground">
                To preserve the invaluable knowledge, stories, proverbs, and traditions of 
                Rwandan elders in a digital space where youth and communities can learn, 
                engage, and honor their heritage.
              </CardContent>
            </Card>

            <Card className="shadow-traditional animate-fall-in" style={{ animationDelay: '0.2s' }}>
              <CardHeader>
                <CardTitle className="text-2xl text-primary flex items-center">
                  <Heart className="h-6 w-6 mr-3 text-accent" />
                  Our Vision
                </CardTitle>
              </CardHeader>
              <CardContent className="text-lg leading-relaxed text-muted-foreground">
                A Rwanda where every elder's voice is heard, every tradition is honored, 
                and every young person is proud of their cultural heritage. Bridging 
                generations through respect and technology.
              </CardContent>
            </Card>
          </div>

          {/* Impact */}
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-primary mb-8 animate-fade-in">Our Impact</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <Card className="text-center shadow-traditional animate-fall-in">
                <CardContent className="p-6">
                  <div className="text-3xl font-bold text-accent mb-2">500+</div>
                  <div className="text-muted-foreground">Community Members</div>
                </CardContent>
              </Card>
              <Card className="text-center shadow-traditional animate-fall-in" style={{ animationDelay: '0.1s' }}>
                <CardContent className="p-6">
                  <div className="text-3xl font-bold text-accent mb-2">200+</div>
                  <div className="text-muted-foreground">Stories Preserved</div>
                </CardContent>
              </Card>
              <Card className="text-center shadow-traditional animate-fall-in" style={{ animationDelay: '0.2s' }}>
                <CardContent className="p-6">
                  <div className="text-3xl font-bold text-accent mb-2">1000+</div>
                  <div className="text-muted-foreground">Hours of Wisdom</div>
                </CardContent>
              </Card>
              <Card className="text-center shadow-traditional animate-fall-in" style={{ animationDelay: '0.3s' }}>
                <CardContent className="p-6">
                  <div className="text-3xl font-bold text-accent mb-2">50+</div>
                  <div className="text-muted-foreground">Partner Schools</div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-primary text-center mb-12 animate-fade-in">
            Meet Our Team
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <Card 
                key={index} 
                className="text-center shadow-traditional hover:shadow-golden transition-all duration-500 animate-fall-in"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <CardContent className="p-6">
                  <div className="w-20 h-20 bg-accent/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Users className="h-10 w-10 text-accent" />
                  </div>
                  <h3 className="text-xl font-semibold text-primary mb-2">{member.name}</h3>
                  <p className="text-accent font-medium mb-2">{member.role}</p>
                  <div className="flex items-center justify-center text-muted-foreground text-sm mb-4">
                    <MapPin className="h-4 w-4 mr-1" />
                    {member.region}
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {member.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-primary text-center mb-12 animate-fade-in">
            Our Journey
          </h2>
          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              {milestones.map((milestone, index) => (
                <Card 
                  key={index} 
                  className="shadow-traditional animate-fall-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="bg-accent text-accent-foreground rounded-full px-4 py-2 font-bold text-sm">
                        {milestone.year}
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-primary mb-2">
                          {milestone.title}
                        </h3>
                        <p className="text-muted-foreground leading-relaxed">
                          {milestone.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6 animate-fade-in">Get In Touch</h2>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Want to learn more about TWIBUKE or get involved? We'd love to hear from you.
          </p>
          <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-golden">
            <Mail className="h-5 w-5 mr-2" />
            Contact Us
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;