import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Plus, X } from "lucide-react";
import { ListingFormData } from "../ListingForm";

interface LocationDetailsProps {
  data: Partial<ListingFormData>;
  onUpdate: (data: Partial<ListingFormData>) => void;
}

export function LocationDetails({ data, onUpdate }: LocationDetailsProps) {
  const [formData, setFormData] = useState({
    country: data.country || "",
    city: data.city || "",
    streetAddress: data.streetAddress || "",
    zipCode: data.zipCode || "",
    nearbyAttractions: data.nearbyAttractions || [],
    neighborhoodDescription: data.neighborhoodDescription || "",
  });

  const [newAttraction, setNewAttraction] = useState("");

  useEffect(() => {
    onUpdate(formData);
  }, [formData, onUpdate]);

  const updateField = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const addAttraction = () => {
    if (newAttraction.trim() && !formData.nearbyAttractions.includes(newAttraction.trim())) {
      updateField("nearbyAttractions", [...formData.nearbyAttractions, newAttraction.trim()]);
      setNewAttraction("");
    }
  };

  const removeAttraction = (attraction: string) => {
    updateField("nearbyAttractions", formData.nearbyAttractions.filter(a => a !== attraction));
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="text-center mb-8">
        <MapPin className="w-12 h-12 text-primary mx-auto mb-4" />
        <h2 className="text-3xl font-bold mb-2">Location Details</h2>
        <p className="text-muted-foreground">Help guests find and understand your property's location</p>
      </div>

      <div className="grid gap-6">
        {/* Country & City */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Country</CardTitle>
              <CardDescription>Which country is your property in?</CardDescription>
            </CardHeader>
            <CardContent>
              <Input
                placeholder="e.g., United States"
                value={formData.country}
                onChange={(e) => updateField("country", e.target.value)}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>City</CardTitle>
              <CardDescription>Which city or town?</CardDescription>
            </CardHeader>
            <CardContent>
              <Input
                placeholder="e.g., New York"
                value={formData.city}
                onChange={(e) => updateField("city", e.target.value)}
              />
            </CardContent>
          </Card>
        </div>

        {/* Address */}
        <Card>
          <CardHeader>
            <CardTitle>Street Address</CardTitle>
            <CardDescription>
              Your exact address helps guests find your property. This won't be shown publicly until after booking.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Label htmlFor="streetAddress">Street Address</Label>
                <Input
                  id="streetAddress"
                  placeholder="e.g., 123 Main Street, Apt 4B"
                  value={formData.streetAddress}
                  onChange={(e) => updateField("streetAddress", e.target.value)}
                  className="mt-2"
                />
              </div>
              <div>
                <Label htmlFor="zipCode">ZIP/Postal Code</Label>
                <Input
                  id="zipCode"
                  placeholder="e.g., 10001"
                  value={formData.zipCode}
                  onChange={(e) => updateField("zipCode", e.target.value)}
                  className="mt-2"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Map Placeholder */}
        <Card>
          <CardHeader>
            <CardTitle>Location on Map</CardTitle>
            <CardDescription>
              Verify your property's location (map integration coming soon)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-muted rounded-lg flex items-center justify-center border-2 border-dashed border-border">
              <div className="text-center text-muted-foreground">
                <MapPin className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p>Interactive Map Coming Soon</p>
                <p className="text-sm">Your property will be pinned here</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Nearby Attractions */}
        <Card>
          <CardHeader>
            <CardTitle>Nearby Attractions</CardTitle>
            <CardDescription>
              Add points of interest, restaurants, landmarks, or transportation nearby
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex gap-2">
                <Input
                  placeholder="e.g., Central Park, Subway Station, Coffee Shop"
                  value={newAttraction}
                  onChange={(e) => setNewAttraction(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addAttraction()}
                />
                <Button onClick={addAttraction} size="icon" variant="outline">
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              
              {formData.nearbyAttractions.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {formData.nearbyAttractions.map((attraction, index) => (
                    <Badge key={index} variant="secondary" className="flex items-center gap-1">
                      {attraction}
                      <button
                        onClick={() => removeAttraction(attraction)}
                        className="ml-1 hover:text-destructive"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Neighborhood Description */}
        <Card>
          <CardHeader>
            <CardTitle>Neighborhood Description</CardTitle>
            <CardDescription>
              Describe the area, its character, and what guests can expect
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="e.g., Located in the heart of downtown, this vibrant neighborhood offers excellent restaurants, shopping, and nightlife. It's a 5-minute walk to the subway and 10 minutes to the financial district..."
              value={formData.neighborhoodDescription}
              onChange={(e) => updateField("neighborhoodDescription", e.target.value)}
              rows={4}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}