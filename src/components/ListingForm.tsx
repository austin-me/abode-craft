import { useState } from "react";
import { ProgressIndicator } from "./ProgressIndicator";
import { ApartmentBasics } from "./steps/ApartmentBasics";
import { LocationDetails } from "./steps/LocationDetails";
import { ApartmentLayout } from "./steps/ApartmentLayout";
import { GuestCapacity } from "./steps/GuestCapacity";
import { AmenitiesFeatures } from "./steps/AmenitiesFeatures";
import { Descriptions } from "./steps/Descriptions";
import { MediaUpload } from "./steps/MediaUpload";
import { PricingFees } from "./steps/PricingFees";
import { ReviewSubmit } from "./steps/ReviewSubmit";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";

const steps = [
  { id: "basics", title: "Basics", description: "Apartment info" },
  { id: "location", title: "Location", description: "Address & area" },
  { id: "layout", title: "Layout", description: "Rooms & size" },
  { id: "capacity", title: "Capacity", description: "Guests & beds" },
  { id: "amenities", title: "Amenities", description: "Features" },
  { id: "descriptions", title: "Description", description: "Details" },
  { id: "media", title: "Photos", description: "Images" },
  { id: "pricing", title: "Pricing", description: "Rates & fees" },
  { id: "review", title: "Review", description: "Final check" },
];

export interface ListingFormData {
  // Apartment Basics
  title: string;
  apartmentType: string;
  buildingType: string;
  listingCategory: string;
  occupancyType: string;
  yearBuilt?: number;
  
  // Location
  country: string;
  city: string;
  streetAddress: string;
  zipCode: string;
  nearbyAttractions: string[];
  neighborhoodDescription: string;
  
  // Layout
  bedrooms: number;
  bathrooms: number;
  hasBathroomHalf: boolean;
  hasLivingRoom: boolean;
  livingRoomSeating?: number;
  kitchenType: string;
  hasBalcony: boolean;
  balconyDescription?: string;
  totalSize?: number;
  sizeUnit: 'sqft' | 'm²';
  floorNumber?: number;
  hasElevator: boolean;
  
  // Capacity
  maxGuests: number;
  beds: Array<{ type: string; count: number }>;
  childrenAllowed: boolean;
  petsAllowed: boolean;
  petNotes?: string;
  
  // Amenities
  amenities: string[];
  kitchenAppliances: string[];
  entertainment: string[];
  climateControl: string[];
  buildingAmenities: string[];
  securityFeatures: string[];
  
  // Descriptions
  listingTitle: string;
  fullDescription: string;
  highlights: string[];
  hostBio: string;
  languagesSpoken: string[];
  
  // Media
  images: string[];
  
  // Pricing
  basePrice: number;
  currency: string;
  cleaningFee?: number;
  securityDeposit?: number;
  
  // Policies (simplified for first version)
  checkInTime: string;
  checkOutTime: string;
  houseRules: string[];
}

interface ListingFormProps {
  onBack: () => void;
  onSubmit: (data: ListingFormData) => void;
  initialData?: Partial<ListingFormData>;
}

export function ListingForm({ onBack, onSubmit, initialData }: ListingFormProps) {
  const [currentStep, setCurrentStep] = useState("basics");
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);
  const [formData, setFormData] = useState<Partial<ListingFormData>>(initialData || {});

  const currentIndex = steps.findIndex(step => step.id === currentStep);
  const isFirstStep = currentIndex === 0;
  const isLastStep = currentIndex === steps.length - 1;

  const updateFormData = (stepData: Partial<ListingFormData>) => {
    setFormData(prev => ({ ...prev, ...stepData }));
  };

  const handleNext = () => {
    // Mark current step as completed
    if (!completedSteps.includes(currentStep)) {
      setCompletedSteps(prev => [...prev, currentStep]);
    }
    
    // Move to next step
    if (currentIndex < steps.length - 1) {
      setCurrentStep(steps[currentIndex + 1].id);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentStep(steps[currentIndex - 1].id);
    }
  };

  const handleSubmit = () => {
    onSubmit(formData as ListingFormData);
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case "basics":
        return <ApartmentBasics data={formData} onUpdate={updateFormData} />;
      case "location":
        return <LocationDetails data={formData} onUpdate={updateFormData} />;
      case "layout":
        return <ApartmentLayout data={formData} onUpdate={updateFormData} />;
      case "capacity":
        return <GuestCapacity data={formData} onUpdate={updateFormData} />;
      case "amenities":
        return <AmenitiesFeatures data={formData} onUpdate={updateFormData} />;
      case "descriptions":
        return <Descriptions data={formData} onUpdate={updateFormData} />;
      case "media":
        return <MediaUpload data={formData} onUpdate={updateFormData} />;
      case "pricing":
        return <PricingFees data={formData} onUpdate={updateFormData} />;
      case "review":
        return <ReviewSubmit data={formData} onUpdate={updateFormData} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Progress Indicator */}
      <ProgressIndicator 
        steps={steps} 
        currentStep={currentStep} 
        completedSteps={completedSteps} 
      />

      {/* Form Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {renderCurrentStep()}
          
          {/* Navigation */}
          <div className="flex justify-between items-center mt-8 pt-6 border-t border-border">
            <Button 
              variant="outline" 
              onClick={isFirstStep ? onBack : handlePrevious}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              {isFirstStep ? 'Back to Welcome' : 'Previous'}
            </Button>
            
            <div className="text-sm text-muted-foreground">
              Step {currentIndex + 1} of {steps.length}
            </div>
            
            {isLastStep ? (
              <Button 
                variant="gradient" 
                onClick={handleSubmit}
                className="flex items-center gap-2"
              >
                Submit Listing
                <ArrowRight className="w-4 h-4" />
              </Button>
            ) : (
              <Button 
                variant="default" 
                onClick={handleNext}
                className="flex items-center gap-2"
              >
                Next
                <ArrowRight className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}