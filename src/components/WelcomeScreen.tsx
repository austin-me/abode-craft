import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, Plus, FileText, Lightbulb } from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";

interface WelcomeScreenProps {
  onStartNew: () => void;
  onResumeDraft: () => void;
  hasDraft?: boolean;
}

export function WelcomeScreen({ onStartNew, onResumeDraft, hasDraft = false }: WelcomeScreenProps) {
  const [showTips, setShowTips] = useState(false);

  const onboardingTips = [
    "Take high-quality photos from multiple angles to attract more guests",
    "Write detailed descriptions highlighting unique features and amenities",
    "Set competitive pricing by researching similar properties in your area",
    "Keep your calendar updated to avoid booking conflicts",
    "Respond to inquiries promptly to improve your response rate"
  ];

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-primary/60" />
        </div>
        
        <div className="relative z-10 container mx-auto px-4 py-20">
          <div className="max-w-3xl mx-auto text-center text-white">
            <Building2 className="w-16 h-16 mx-auto mb-6 opacity-90" />
            <h1 className="text-5xl font-bold mb-6 leading-tight">
              List Your Apartment
            </h1>
            <p className="text-xl opacity-90 leading-relaxed">
              Create beautiful listings that attract the right guests. 
              Our step-by-step guide makes it easy to showcase your property.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Action Cards */}
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {/* Start New Listing */}
            <Card className="border-0 shadow-medium hover:shadow-large transition-smooth cursor-pointer group" onClick={onStartNew}>
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-spring">
                  <Plus className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-2xl">Start New Listing</CardTitle>
                <CardDescription className="text-base">
                  Create a brand new apartment listing from scratch
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <Button variant="gradient" size="lg" className="w-full">
                  Get Started
                </Button>
              </CardContent>
            </Card>

            {/* Resume Draft */}
            <Card className={`border-0 shadow-medium hover:shadow-large transition-smooth cursor-pointer group ${
              hasDraft ? 'opacity-100' : 'opacity-50 cursor-not-allowed'
            }`} onClick={hasDraft ? onResumeDraft : undefined}>
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-spring">
                  <FileText className="w-8 h-8 text-accent-foreground" />
                </div>
                <CardTitle className="text-2xl">Resume Draft</CardTitle>
                <CardDescription className="text-base">
                  {hasDraft ? 'Continue your saved listing draft' : 'No draft available'}
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <Button 
                  variant={hasDraft ? "accent" : "secondary"} 
                  size="lg" 
                  className="w-full"
                  disabled={!hasDraft}
                >
                  {hasDraft ? 'Continue Draft' : 'No Draft'}
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Onboarding Tips */}
          <Card className="border-0 shadow-soft">
            <CardHeader>
              <div 
                className="flex items-center justify-between cursor-pointer"
                onClick={() => setShowTips(!showTips)}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-warning/20 rounded-full flex items-center justify-center">
                    <Lightbulb className="w-5 h-5 text-warning" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">Pro Tips for Great Listings</CardTitle>
                    <CardDescription>
                      Essential tips to make your listing stand out
                    </CardDescription>
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  {showTips ? 'Hide' : 'Show'} Tips
                </Button>
              </div>
            </CardHeader>
            
            {showTips && (
              <CardContent className="pt-0 animate-fade-in">
                <div className="space-y-3">
                  {onboardingTips.map((tip, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                      <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-xs font-medium text-primary">{index + 1}</span>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">{tip}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}