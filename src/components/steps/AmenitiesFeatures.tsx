import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Wifi, Tv, Car, Shield, Utensils, Snowflake, Waves, Dumbbell } from "lucide-react";
import { ListingFormData } from "../ListingForm";

interface AmenitiesFeaturesProps {
  data: Partial<ListingFormData>;
  onUpdate: (data: Partial<ListingFormData>) => void;
}

export function AmenitiesFeatures({ data, onUpdate }: AmenitiesFeaturesProps) {
  const [formData, setFormData] = useState({
    amenities: data.amenities || [],
    kitchenAppliances: data.kitchenAppliances || [],
    entertainment: data.entertainment || [],
    climateControl: data.climateControl || [],
    buildingAmenities: data.buildingAmenities || [],
    securityFeatures: data.securityFeatures || [],
  });

  useEffect(() => {
    onUpdate(formData);
  }, [formData, onUpdate]);

  const toggleAmenity = (category: keyof typeof formData, amenity: string) => {
    const currentAmenities = formData[category];
    const updatedAmenities = currentAmenities.includes(amenity)
      ? currentAmenities.filter(a => a !== amenity)
      : [...currentAmenities, amenity];
    
    setFormData(prev => ({ ...prev, [category]: updatedAmenities }));
  };

  const isSelected = (category: keyof typeof formData, amenity: string) => {
    return formData[category].includes(amenity);
  };

  const generalAmenities = [
    "Free Wi-Fi", "Air Conditioning", "Heating", "Washing Machine", "Dryer",
    "Iron & Ironing Board", "Hair Dryer", "Towels & Linens", "Parking Space",
    "Balcony/Patio", "Garden Access", "Workspace/Desk"
  ];

  const kitchenAppliances = [
    "Full Kitchen", "Refrigerator", "Microwave", "Oven", "Stovetop",
    "Dishwasher", "Coffee Maker", "Toaster", "Kettle", "Cookware & Utensils",
    "Dining Table", "Basic Pantry Items"
  ];

  const entertainment = [
    "TV", "Cable/Satellite TV", "Netflix", "Streaming Services", "Sound System",
    "Bluetooth Speaker", "Board Games", "Books", "High-Speed Internet",
    "Gaming Console", "DVD Player", "Outdoor Speakers"
  ];

  const climateControl = [
    "Central Air Conditioning", "Window AC Unit", "Central Heating",
    "Space Heater", "Ceiling Fans", "Portable Fans", "Fireplace",
    "Heated Floors", "Smart Thermostat"
  ];

  const buildingAmenities = [
    "Elevator", "Swimming Pool", "Fitness Center/Gym", "Concierge Service",
    "24/7 Front Desk", "Rooftop Access", "Business Center", "Laundry Room",
    "Package Receiving", "Bicycle Storage", "Pet-Friendly Areas", "Playground"
  ];

  const securityFeatures = [
    "Security Cameras (Common Areas)", "Gated Entry", "Doorman", "Security Guard",
    "Keypad Entry", "Smoke Detector", "Carbon Monoxide Detector", "Fire Extinguisher",
    "First Aid Kit", "Safe/Lockbox", "Security System", "Well-Lit Areas"
  ];

  const AmenitySection = ({ 
    title, 
    description, 
    icon: Icon, 
    amenities, 
    category 
  }: {
    title: string;
    description: string;
    icon: any;
    amenities: string[];
    category: keyof typeof formData;
  }) => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Icon className="w-5 h-5" />
          {title}
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {amenities.map((amenity) => (
            <div
              key={amenity}
              className="flex items-center space-x-2 p-2 rounded-lg hover:bg-muted/50 transition-smooth cursor-pointer"
              onClick={() => toggleAmenity(category, amenity)}
            >
              <Checkbox
                id={`${category}-${amenity}`}
                checked={isSelected(category, amenity)}
                onChange={() => toggleAmenity(category, amenity)}
              />
              <label
                htmlFor={`${category}-${amenity}`}
                className="text-sm cursor-pointer flex-1"
              >
                {amenity}
              </label>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="text-center mb-8">
        <Utensils className="w-12 h-12 text-primary mx-auto mb-4" />
        <h2 className="text-3xl font-bold mb-2">Amenities & Features</h2>
        <p className="text-muted-foreground">Select all amenities and features available to your guests</p>
      </div>

      {/* Selected Amenities Summary */}
      {Object.values(formData).some(arr => arr.length > 0) && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Selected Amenities</CardTitle>
            <CardDescription>
              {Object.values(formData).reduce((total, arr) => total + arr.length, 0)} amenities selected
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto">
              {Object.entries(formData).map(([category, amenities]) =>
                amenities.map((amenity) => (
                  <Badge key={`${category}-${amenity}`} variant="secondary">
                    {amenity}
                  </Badge>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-6">
        <AmenitySection
          title="General Amenities"
          description="Basic amenities and conveniences"
          icon={Wifi}
          amenities={generalAmenities}
          category="amenities"
        />

        <AmenitySection
          title="Kitchen & Dining"
          description="Kitchen appliances and dining facilities"
          icon={Utensils}
          amenities={kitchenAppliances}
          category="kitchenAppliances"
        />

        <AmenitySection
          title="Entertainment"
          description="Entertainment and connectivity options"
          icon={Tv}
          amenities={entertainment}
          category="entertainment"
        />

        <AmenitySection
          title="Climate Control"
          description="Heating, cooling, and air circulation"
          icon={Snowflake}
          amenities={climateControl}
          category="climateControl"
        />

        <AmenitySection
          title="Building Amenities"
          description="Shared facilities and building features"
          icon={Dumbbell}
          amenities={buildingAmenities}
          category="buildingAmenities"
        />

        <AmenitySection
          title="Security Features"
          description="Safety and security measures"
          icon={Shield}
          amenities={securityFeatures}
          category="securityFeatures"
        />
      </div>
    </div>
  );
}