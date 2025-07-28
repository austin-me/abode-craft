import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Users, Bed, Baby, PawPrint, Plus, Minus } from "lucide-react";
import { ListingFormData } from "../ListingForm";

interface GuestCapacityProps {
  data: Partial<ListingFormData>;
  onUpdate: (data: Partial<ListingFormData>) => void;
}

export function GuestCapacity({ data, onUpdate }: GuestCapacityProps) {
  const [formData, setFormData] = useState({
    maxGuests: data.maxGuests || 1,
    beds: data.beds || [{ type: "queen", count: 1 }],
    childrenAllowed: data.childrenAllowed || false,
    petsAllowed: data.petsAllowed || false,
    petNotes: data.petNotes || "",
  });

  useEffect(() => {
    onUpdate(formData);
  }, [formData, onUpdate]);

  const updateField = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const updateBedCount = (index: number, field: 'type' | 'count', value: string | number) => {
    const updatedBeds = [...formData.beds];
    updatedBeds[index] = { ...updatedBeds[index], [field]: value };
    updateField("beds", updatedBeds);
  };

  const addBed = () => {
    updateField("beds", [...formData.beds, { type: "queen", count: 1 }]);
  };

  const removeBed = (index: number) => {
    if (formData.beds.length > 1) {
      updateField("beds", formData.beds.filter((_, i) => i !== index));
    }
  };

  const bedTypes = [
    { value: "king", label: "King Bed" },
    { value: "queen", label: "Queen Bed" },
    { value: "double", label: "Double Bed" },
    { value: "single", label: "Single Bed" },
    { value: "sofa-bed", label: "Sofa Bed" },
    { value: "bunk", label: "Bunk Bed" },
    { value: "futon", label: "Futon" },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="text-center mb-8">
        <Users className="w-12 h-12 text-primary mx-auto mb-4" />
        <h2 className="text-3xl font-bold mb-2">Guest Capacity</h2>
        <p className="text-muted-foreground">Define how many guests you can accommodate and sleeping arrangements</p>
      </div>

      <div className="grid gap-6">
        {/* Maximum Guests */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              Maximum Guests
            </CardTitle>
            <CardDescription>
              What's the maximum number of guests you can accommodate?
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                size="icon"
                onClick={() => updateField("maxGuests", Math.max(1, formData.maxGuests - 1))}
                disabled={formData.maxGuests <= 1}
              >
                <Minus className="w-4 h-4" />
              </Button>
              <span className="text-2xl font-semibold min-w-12 text-center">
                {formData.maxGuests}
              </span>
              <Button
                variant="outline"
                size="icon"
                onClick={() => updateField("maxGuests", formData.maxGuests + 1)}
              >
                <Plus className="w-4 h-4" />
              </Button>
              <span className="text-muted-foreground ml-2">guests</span>
            </div>
          </CardContent>
        </Card>

        {/* Bed Types & Arrangements */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bed className="w-5 h-5" />
              Bed Arrangements
            </CardTitle>
            <CardDescription>
              Specify the types and number of beds available to guests
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {formData.beds.map((bed, index) => (
                <div key={index} className="flex items-center gap-4 p-4 border border-border rounded-lg">
                  <div className="flex-1">
                    <Select 
                      value={bed.type} 
                      onValueChange={(value) => updateBedCount(index, 'type', value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {bedTypes.map((bedType) => (
                          <SelectItem key={bedType.value} value={bedType.value}>
                            {bedType.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => updateBedCount(index, 'count', Math.max(1, bed.count - 1))}
                      disabled={bed.count <= 1}
                    >
                      <Minus className="w-4 h-4" />
                    </Button>
                    <span className="min-w-8 text-center">{bed.count}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => updateBedCount(index, 'count', bed.count + 1)}
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                  
                  {formData.beds.length > 1 && (
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => removeBed(index)}
                      className="text-destructive hover:text-destructive"
                    >
                      <Minus className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              ))}
              
              <Button
                variant="outline"
                onClick={addBed}
                className="w-full flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Add Another Bed Type
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Children & Pets */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Baby className="w-5 h-5" />
                Children Policy
              </CardTitle>
              <CardDescription>Are children welcome at your property?</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2">
                <Switch
                  id="children"
                  checked={formData.childrenAllowed}
                  onCheckedChange={(checked) => updateField("childrenAllowed", checked)}
                />
                <Label htmlFor="children">Children allowed</Label>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PawPrint className="w-5 h-5" />
                Pet Policy
              </CardTitle>
              <CardDescription>Do you allow pets at your property?</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="pets"
                    checked={formData.petsAllowed}
                    onCheckedChange={(checked) => updateField("petsAllowed", checked)}
                  />
                  <Label htmlFor="pets">Pets allowed</Label>
                </div>
                
                {formData.petsAllowed && (
                  <div>
                    <Label htmlFor="pet-notes">Pet Guidelines</Label>
                    <Textarea
                      id="pet-notes"
                      placeholder="e.g., Small dogs welcome, $50 pet fee, must be house-trained..."
                      value={formData.petNotes}
                      onChange={(e) => updateField("petNotes", e.target.value)}
                      className="mt-2"
                      rows={3}
                    />
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}