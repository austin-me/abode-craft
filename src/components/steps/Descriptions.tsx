import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileText, Star, MessageCircle, Globe, Plus, X } from "lucide-react";
import { ListingFormData } from "../ListingForm";

interface DescriptionsProps {
  data: Partial<ListingFormData>;
  onUpdate: (data: Partial<ListingFormData>) => void;
}

export function Descriptions({ data, onUpdate }: DescriptionsProps) {
  const [formData, setFormData] = useState({
    listingTitle: data.listingTitle || "",
    fullDescription: data.fullDescription || "",
    highlights: data.highlights || [],
    hostBio: data.hostBio || "",
    languagesSpoken: data.languagesSpoken || [],
  });

  const [newHighlight, setNewHighlight] = useState("");
  const [newLanguage, setNewLanguage] = useState("");

  useEffect(() => {
    onUpdate(formData);
  }, [formData, onUpdate]);

  const updateField = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const addHighlight = () => {
    if (newHighlight.trim() && !formData.highlights.includes(newHighlight.trim())) {
      updateField("highlights", [...formData.highlights, newHighlight.trim()]);
      setNewHighlight("");
    }
  };

  const removeHighlight = (highlight: string) => {
    updateField("highlights", formData.highlights.filter(h => h !== highlight));
  };

  const addLanguage = () => {
    if (newLanguage.trim() && !formData.languagesSpoken.includes(newLanguage.trim())) {
      updateField("languagesSpoken", [...formData.languagesSpoken, newLanguage.trim()]);
      setNewLanguage("");
    }
  };

  const removeLanguage = (language: string) => {
    updateField("languagesSpoken", formData.languagesSpoken.filter(l => l !== language));
  };

  const commonLanguages = [
    "English", "Spanish", "French", "German", "Italian", "Portuguese", 
    "Chinese", "Japanese", "Korean", "Arabic", "Russian", "Dutch"
  ];

  const suggestedHighlights = [
    "Prime Location", "Recently Renovated", "High-Speed WiFi", "Great Views",
    "Walking Distance to Metro", "Quiet Neighborhood", "Modern Amenities",
    "Rooftop Access", "Pet-Friendly", "Family-Friendly", "Business Traveler Friendly"
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="text-center mb-8">
        <FileText className="w-12 h-12 text-primary mx-auto mb-4" />
        <h2 className="text-3xl font-bold mb-2">Descriptions</h2>
        <p className="text-muted-foreground">Tell guests about your property and hosting style</p>
      </div>

      <div className="grid gap-6">
        {/* Listing Title */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="w-5 h-5" />
              Listing Title
            </CardTitle>
            <CardDescription>
              Create an attention-grabbing title that highlights your property's best features
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Label htmlFor="listing-title">Property Title</Label>
            <Input
              id="listing-title"
              placeholder="e.g., Stunning Downtown Loft with Panoramic City Views"
              value={formData.listingTitle}
              onChange={(e) => updateField("listingTitle", e.target.value)}
              className="mt-2"
              maxLength={80}
            />
            <p className="text-xs text-muted-foreground mt-1">
              {formData.listingTitle.length}/80 characters
            </p>
          </CardContent>
        </Card>

        {/* Full Description */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageCircle className="w-5 h-5" />
              Property Description
            </CardTitle>
            <CardDescription>
              Provide a detailed description of your property, the space, and the experience guests can expect
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Label htmlFor="full-description">Detailed Description</Label>
            <Textarea
              id="full-description"
              placeholder="Welcome to our beautiful apartment! Located in the heart of [neighborhood], this space offers... 

Describe:
- The space and its unique features
- The neighborhood and what makes it special
- What guests can expect during their stay
- Any special touches or amenities
- Nearby attractions and transportation"
              value={formData.fullDescription}
              onChange={(e) => updateField("fullDescription", e.target.value)}
              className="mt-2"
              rows={8}
              maxLength={1000}
            />
            <p className="text-xs text-muted-foreground mt-1">
              {formData.fullDescription.length}/1000 characters
            </p>
          </CardContent>
        </Card>

        {/* Highlights/Tags */}
        <Card>
          <CardHeader>
            <CardTitle>Property Highlights</CardTitle>
            <CardDescription>
              Add key selling points and features that make your property stand out
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex gap-2">
                <Input
                  placeholder="e.g., Prime Location, Ocean View, Recently Renovated"
                  value={newHighlight}
                  onChange={(e) => setNewHighlight(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addHighlight()}
                />
                <Button onClick={addHighlight} size="icon" variant="outline">
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              
              {/* Suggested Highlights */}
              <div>
                <Label className="text-sm text-muted-foreground">Suggested highlights:</Label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {suggestedHighlights
                    .filter(h => !formData.highlights.includes(h))
                    .slice(0, 6)
                    .map((highlight) => (
                    <Badge
                      key={highlight}
                      variant="outline"
                      className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-smooth"
                      onClick={() => updateField("highlights", [...formData.highlights, highlight])}
                    >
                      {highlight}
                    </Badge>
                  ))}
                </div>
              </div>
              
              {/* Selected Highlights */}
              {formData.highlights.length > 0 && (
                <div>
                  <Label className="text-sm">Selected highlights:</Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {formData.highlights.map((highlight, index) => (
                      <Badge key={index} variant="secondary" className="flex items-center gap-1">
                        {highlight}
                        <button
                          onClick={() => removeHighlight(highlight)}
                          className="ml-1 hover:text-destructive"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Host Bio */}
        <Card>
          <CardHeader>
            <CardTitle>Host Bio</CardTitle>
            <CardDescription>
              Tell guests a little about yourself and your hosting style
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Label htmlFor="host-bio">About You</Label>
            <Textarea
              id="host-bio"
              placeholder="Hi, I'm [name]! I love hosting travelers and helping them discover the best of [city]. I'm a [profession/hobby] and enjoy [interests]. I'm always happy to provide recommendations for restaurants, attractions, and hidden gems in the area..."
              value={formData.hostBio}
              onChange={(e) => updateField("hostBio", e.target.value)}
              className="mt-2"
              rows={4}
              maxLength={500}
            />
            <p className="text-xs text-muted-foreground mt-1">
              {formData.hostBio.length}/500 characters
            </p>
          </CardContent>
        </Card>

        {/* Languages Spoken */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="w-5 h-5" />
              Languages Spoken
            </CardTitle>
            <CardDescription>
              Let guests know which languages you can communicate in
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex gap-2">
                <Input
                  placeholder="Add a language"
                  value={newLanguage}
                  onChange={(e) => setNewLanguage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addLanguage()}
                />
                <Button onClick={addLanguage} size="icon" variant="outline">
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              
              {/* Common Languages */}
              <div>
                <Label className="text-sm text-muted-foreground">Common languages:</Label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {commonLanguages
                    .filter(lang => !formData.languagesSpoken.includes(lang))
                    .slice(0, 8)
                    .map((language) => (
                    <Badge
                      key={language}
                      variant="outline"
                      className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-smooth"
                      onClick={() => updateField("languagesSpoken", [...formData.languagesSpoken, language])}
                    >
                      {language}
                    </Badge>
                  ))}
                </div>
              </div>
              
              {/* Selected Languages */}
              {formData.languagesSpoken.length > 0 && (
                <div>
                  <Label className="text-sm">You speak:</Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {formData.languagesSpoken.map((language, index) => (
                      <Badge key={index} variant="secondary" className="flex items-center gap-1">
                        {language}
                        <button
                          onClick={() => removeLanguage(language)}
                          className="ml-1 hover:text-destructive"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}