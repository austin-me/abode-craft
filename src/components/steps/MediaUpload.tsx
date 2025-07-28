import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Camera, Upload, Image as ImageIcon, Star, Trash2 } from "lucide-react";
import { ListingFormData } from "../ListingForm";

interface MediaUploadProps {
  data: Partial<ListingFormData>;
  onUpdate: (data: Partial<ListingFormData>) => void;
}

export function MediaUpload({ data, onUpdate }: MediaUploadProps) {
  const [formData, setFormData] = useState({
    images: data.images || [],
  });

  useEffect(() => {
    onUpdate(formData);
  }, [formData, onUpdate]);

  const updateField = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // Mock image upload - in a real app, this would upload to a file storage service
  const handleImageUpload = (category: string) => {
    // Simulate adding an image URL
    const mockImageUrl = `https://images.unsplash.com/photo-${Date.now()}?w=400&h=300`;
    const newImages = [...formData.images, mockImageUrl];
    updateField("images", newImages);
  };

  const removeImage = (index: number) => {
    const newImages = formData.images.filter((_, i) => i !== index);
    updateField("images", newImages);
  };

  const setAsCover = (index: number) => {
    const newImages = [...formData.images];
    const [coverImage] = newImages.splice(index, 1);
    newImages.unshift(coverImage);
    updateField("images", newImages);
  };

  const photoCategories = [
    {
      id: "cover",
      title: "Cover Photo",
      description: "Main photo that guests see first",
      icon: Star,
      required: true
    },
    {
      id: "bedrooms",
      title: "Bedroom Photos",
      description: "Show all sleeping areas",
      icon: Camera,
      required: true
    },
    {
      id: "bathrooms",
      title: "Bathroom Photos", 
      description: "All bathroom facilities",
      icon: Camera,
      required: true
    },
    {
      id: "kitchen",
      title: "Kitchen & Dining",
      description: "Kitchen and eating areas",
      icon: Camera,
      required: false
    },
    {
      id: "living",
      title: "Living Areas",
      description: "Common spaces and seating",
      icon: Camera,
      required: false
    },
    {
      id: "exterior",
      title: "Building & Views",
      description: "Building exterior and views",
      icon: Camera,
      required: false
    }
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="text-center mb-8">
        <ImageIcon className="w-12 h-12 text-primary mx-auto mb-4" />
        <h2 className="text-3xl font-bold mb-2">Photos & Media</h2>
        <p className="text-muted-foreground">High-quality photos help your listing stand out and attract more guests</p>
      </div>

      <div className="grid gap-6">
        {/* Photo Upload Guidelines */}
        <Card className="border-primary/20 bg-primary/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-primary">
              <Camera className="w-5 h-5" />
              Photo Tips for Great Listings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Take photos during the day with natural light</li>
              <li>• Clean and declutter spaces before photographing</li>
              <li>• Include wide shots that show the entire room</li>
              <li>• Highlight unique features and amenities</li>
              <li>• Use horizontal (landscape) orientation</li>
              <li>• Minimum resolution: 1024x683 pixels</li>
            </ul>
          </CardContent>
        </Card>

        {/* Current Images */}
        {formData.images.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Uploaded Photos ({formData.images.length})</CardTitle>
              <CardDescription>
                Drag to reorder. The first photo will be your cover image.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {formData.images.map((image, index) => (
                  <div key={index} className="relative group">
                    <div className="aspect-square bg-muted rounded-lg overflow-hidden border-2 border-border">
                      <div className="w-full h-full bg-gradient-to-br from-muted to-muted-foreground/20 flex items-center justify-center">
                        <Camera className="w-8 h-8 text-muted-foreground" />
                      </div>
                    </div>
                    
                    {/* Cover Badge */}
                    {index === 0 && (
                      <div className="absolute top-2 left-2">
                        <div className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded flex items-center gap-1">
                          <Star className="w-3 h-3" />
                          Cover
                        </div>
                      </div>
                    )}
                    
                    {/* Action Buttons */}
                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                      {index !== 0 && (
                        <Button
                          size="icon"
                          variant="secondary"
                          className="h-8 w-8"
                          onClick={() => setAsCover(index)}
                        >
                          <Star className="w-4 h-4" />
                        </Button>
                      )}
                      <Button
                        size="icon"
                        variant="destructive"
                        className="h-8 w-8"
                        onClick={() => removeImage(index)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Photo Categories */}
        <div className="grid gap-4">
          {photoCategories.map((category) => (
            <Card key={category.id}>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <category.icon className="w-5 h-5" />
                    {category.title}
                    {category.required && (
                      <span className="text-xs bg-destructive text-destructive-foreground px-2 py-1 rounded">
                        Required
                      </span>
                    )}
                  </div>
                </CardTitle>
                <CardDescription>{category.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button
                    variant="outline"
                    onClick={() => handleImageUpload(category.id)}
                    className="flex items-center gap-2"
                  >
                    <Upload className="w-4 h-4" />
                    Upload Photos
                  </Button>
                  <Button
                    variant="ghost"
                    className="flex items-center gap-2"
                  >
                    <Camera className="w-4 h-4" />
                    Take Photos
                  </Button>
                </div>
                
                {/* Upload Area */}
                <div 
                  className="mt-4 border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 transition-smooth cursor-pointer"
                  onClick={() => handleImageUpload(category.id)}
                >
                  <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">
                    Drag and drop photos here, or click to browse
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Supports JPG, PNG, HEIC up to 20MB each
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional Media */}
        <Card>
          <CardHeader>
            <CardTitle>Additional Media (Optional)</CardTitle>
            <CardDescription>
              Floor plans, virtual tours, or legal documents
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid sm:grid-cols-2 gap-4">
              <Button variant="outline" className="h-20 flex-col gap-2">
                <ImageIcon className="w-6 h-6" />
                Floor Plan
              </Button>
              <Button variant="outline" className="h-20 flex-col gap-2">
                <Camera className="w-6 h-6" />
                Virtual Tour
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}