import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CheckCircle, AlertTriangle, MapPin, Users, DollarSign, Camera, Edit } from "lucide-react";
import { ListingFormData } from "../ListingForm";

interface ReviewSubmitProps {
  data: Partial<ListingFormData>;
  onUpdate: (data: Partial<ListingFormData>) => void;
}

export function ReviewSubmit({ data }: ReviewSubmitProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Validation checks
  const requiredFields = {
    "Apartment Title": data.title,
    "Apartment Type": data.apartmentType,
    "Country": data.country,
    "City": data.city,
    "Street Address": data.streetAddress,
    "Base Price": data.basePrice,
    "Max Guests": data.maxGuests,
  };

  const missingFields = Object.entries(requiredFields)
    .filter(([_, value]) => !value || (typeof value === 'number' && value <= 0))
    .map(([field, _]) => field);

  const isComplete = missingFields.length === 0;

  const handleSubmit = async () => {
    setIsSubmitting(true);
    // Simulate submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    // In a real app, this would submit to a backend
    alert("Listing submitted successfully! (This is a demo)");
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="text-center mb-8">
        <CheckCircle className="w-12 h-12 text-primary mx-auto mb-4" />
        <h2 className="text-3xl font-bold mb-2">Review & Submit</h2>
        <p className="text-muted-foreground">Review your listing details before publishing</p>
      </div>

      <div className="grid gap-6">
        {/* Validation Status */}
        <Card className={isComplete ? "border-success/20 bg-success/5" : "border-warning/20 bg-warning/5"}>
          <CardHeader>
            <CardTitle className={`flex items-center gap-2 ${isComplete ? "text-success" : "text-warning"}`}>
              {isComplete ? (
                <CheckCircle className="w-5 h-5" />
              ) : (
                <AlertTriangle className="w-5 h-5" />
              )}
              Listing Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isComplete ? (
              <p className="text-success">Your listing is ready to publish!</p>
            ) : (
              <div>
                <p className="text-warning mb-3">Please complete the following required fields:</p>
                <div className="flex flex-wrap gap-2">
                  {missingFields.map((field, index) => (
                    <Badge key={index} variant="outline" className="border-warning text-warning">
                      {field}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Listing Preview */}
        <Card>
          <CardHeader>
            <CardTitle>Listing Preview</CardTitle>
            <CardDescription>
              How your listing will appear to potential guests
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* Header Info */}
              <div>
                <h3 className="text-xl font-semibold mb-2">
                  {data.title || data.listingTitle || "Your Apartment Title"}
                </h3>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {data.city ? `${data.city}, ${data.country}` : "Location"}
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    {data.maxGuests || 0} guests
                  </div>
                  <div className="flex items-center gap-1">
                    <DollarSign className="w-4 h-4" />
                    {data.basePrice ? `$${data.basePrice}/night` : "Price not set"}
                  </div>
                </div>
              </div>

              {/* Property Details */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-2">Property Details</h4>
                  <div className="space-y-1 text-sm text-muted-foreground">
                    <p>Type: {data.apartmentType || "Not specified"}</p>
                    <p>Building: {data.buildingType || "Not specified"}</p>
                    <p>Category: {data.listingCategory || "Not specified"}</p>
                    <p>Occupancy: {data.occupancyType || "Not specified"}</p>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Space Layout</h4>
                  <div className="space-y-1 text-sm text-muted-foreground">
                    <p>Bedrooms: {data.bedrooms ?? 0}</p>
                    <p>Bathrooms: {data.bathrooms ?? 0}{data.hasBathroomHalf ? " + half bath" : ""}</p>
                    <p>Kitchen: {data.kitchenType || "Not specified"}</p>
                    {data.totalSize && (
                      <p>Size: {data.totalSize} {data.sizeUnit}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Description */}
              {data.fullDescription && (
                <div>
                  <h4 className="font-medium mb-2">Description</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {data.fullDescription.slice(0, 200)}
                    {data.fullDescription.length > 200 && "..."}
                  </p>
                </div>
              )}

              {/* Highlights */}
              {data.highlights && data.highlights.length > 0 && (
                <div>
                  <h4 className="font-medium mb-2">Highlights</h4>
                  <div className="flex flex-wrap gap-2">
                    {data.highlights.slice(0, 6).map((highlight, index) => (
                      <Badge key={index} variant="secondary">
                        {highlight}
                      </Badge>
                    ))}
                    {data.highlights.length > 6 && (
                      <Badge variant="outline">+{data.highlights.length - 6} more</Badge>
                    )}
                  </div>
                </div>
              )}

              {/* Amenities Summary */}
              {data.amenities && data.amenities.length > 0 && (
                <div>
                  <h4 className="font-medium mb-2">Amenities</h4>
                  <div className="flex flex-wrap gap-2">
                    {data.amenities.slice(0, 8).map((amenity, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {amenity}
                      </Badge>
                    ))}
                    {data.amenities.length > 8 && (
                      <Badge variant="outline">+{data.amenities.length - 8} more</Badge>
                    )}
                  </div>
                </div>
              )}

              {/* Photos */}
              <div>
                <h4 className="font-medium mb-2 flex items-center gap-2">
                  <Camera className="w-4 h-4" />
                  Photos ({data.images?.length || 0})
                </h4>
                {data.images && data.images.length > 0 ? (
                  <div className="grid grid-cols-4 gap-2">
                    {data.images.slice(0, 4).map((_, index) => (
                      <div key={index} className="aspect-square bg-muted rounded border flex items-center justify-center">
                        <Camera className="w-6 h-6 text-muted-foreground" />
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">No photos uploaded</p>
                )}
              </div>

              {/* Pricing */}
              {data.basePrice && (
                <div>
                  <h4 className="font-medium mb-2">Pricing</h4>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span>Base rate per night</span>
                      <span>${data.basePrice}</span>
                    </div>
                    {data.cleaningFee && (
                      <div className="flex justify-between">
                        <span>Cleaning fee</span>
                        <span>${data.cleaningFee}</span>
                      </div>
                    )}
                    {data.securityDeposit && (
                      <div className="flex justify-between text-muted-foreground">
                        <span>Security deposit</span>
                        <span>${data.securityDeposit} (refundable)</span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Submit Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Ready to Publish?</CardTitle>
            <CardDescription>
              Once submitted, your listing will be reviewed and published within 24 hours.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                variant="outline"
                className="flex items-center gap-2"
                disabled={isSubmitting}
              >
                <Edit className="w-4 h-4" />
                Save as Draft
              </Button>
              <Button
                variant="gradient"
                onClick={handleSubmit}
                disabled={!isComplete || isSubmitting}
                className="flex items-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-4 h-4" />
                    Publish Listing
                  </>
                )}
              </Button>
            </div>
            
            {!isComplete && (
              <p className="text-sm text-muted-foreground mt-3">
                Complete all required fields to publish your listing.
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}