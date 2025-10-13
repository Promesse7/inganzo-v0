import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Heart, Mail, Lock, User } from "lucide-react";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-accent to-accent/80 text-accent-foreground">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Welcome Back
            </h1>
            <p className="text-xl opacity-90 mb-8">
              Continue your journey of preserving and learning from Rwandan wisdom.
            </p>
          </div>
        </div>
      </section>

      {/* Login Form */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto">
            <Card className="shadow-traditional animate-fall-in">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-accent/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Heart className="h-8 w-8 text-accent" />
                </div>
                <CardTitle className="text-2xl text-primary">
                  Sign In to TWIBUKE
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <form className="space-y-6">
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                      <Input 
                        id="email" 
                        type="email" 
                        placeholder="Enter your email"
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                      <Input 
                        id="password" 
                        type="password" 
                        placeholder="Enter your password"
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="remember" />
                      <label htmlFor="remember" className="text-sm text-muted-foreground">
                        Remember me
                      </label>
                    </div>
                    <a href="#" className="text-sm text-accent hover:text-accent/80">
                      Forgot password?
                    </a>
                  </div>

                  <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
                    Sign In
                  </Button>

                  <div className="text-center">
                    <span className="text-muted-foreground">Don't have an account? </span>
                    <Link to="/signup" className="text-accent hover:text-accent/80 font-medium">
                      Sign up
                    </Link>
                  </div>
                </form>
              </CardContent>
            </Card>

            {/* Community Benefits */}
            <Card className="mt-8 bg-secondary/50 animate-fall-in" style={{ animationDelay: '0.3s' }}>
              <CardHeader>
                <CardTitle className="text-lg text-primary text-center">
                  Join Our Community
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <Heart className="h-4 w-4 mr-2 text-accent" />
                    Share your stories and wisdom
                  </div>
                  <div className="flex items-center">
                    <Heart className="h-4 w-4 mr-2 text-accent" />
                    Connect with elders and youth
                  </div>
                  <div className="flex items-center">
                    <Heart className="h-4 w-4 mr-2 text-accent" />
                    Access exclusive cultural content
                  </div>
                  <div className="flex items-center">
                    <Heart className="h-4 w-4 mr-2 text-accent" />
                    Participate in preservation efforts
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Login;