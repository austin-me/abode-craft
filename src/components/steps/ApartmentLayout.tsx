import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { LayoutGrid, Bed, Bath, ChefHat, Home } from "lucide-react";
import { ListingFormData } from "../ListingForm";

interface ApartmentLayoutProps {
  data: Partial<ListingFormData>;
  onUpdate: (data: Partial<ListingFormData>) => void;
}

export function ApartmentLayout({ data, onUpdate }: ApartmentLayoutProps) {
  const [formData, setFormData] = useState({
    bedrooms: data.bedrooms || 0,
    bathrooms: data.bathrooms || 0,
    hasBathroomHalf: data.hasBathroomHalf || false,
    hasLivingRoom: data.hasLivingRoom || false,
    livingRoomSeating: data.livingRoomSeating || undefined,
    kitchenType: data.kitchenType || "",
    hasBalcony: data.hasBalcony || false,
    balconyDescription: data.balconyDescription || "",
    totalSize: data.totalSize || undefined,
    sizeUnit: data.sizeUnit || 'sqft' as const,
    floorNumber: data.floorNumber || undefined,
    hasElevator: data.hasElevator || false,
  });

  useEffect(() => {
    onUpdate(formData);
  }, [formData, onUpdate]);

  const updateField = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="text-center mb-8">
        <LayoutGrid className="w-12 h-12 text-primary mx-auto mb-4" />
        <h2 className="text-3xl font-bold mb-2">Apartment Layout</h2>
        <p className="text-muted-foreground">Define the structure and space of your property</p>
      </div>

      <div className="grid gap-6">
        {/* Bedrooms & Bathrooms */}
        <div className="grid md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bed className="w-5 h-5" />
                Bedrooms
              </CardTitle>
              <CardDescription>Number of bedrooms</CardDescription>
            </CardHeader>
            <CardContent>
              <Select value={formData.bedrooms.toString()} onValueChange={(value) => updateField("bedrooms", parseInt(value))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0">Studio (0 bedrooms)</SelectItem>
                  <SelectItem value="1">1 bedroom</SelectItem>
                  <SelectItem value="2">2 bedrooms</SelectItem>
                  <SelectItem value="3">3 bedrooms</SelectItem>
                  <SelectItem value="4">4 bedrooms</SelectItem>
                  <SelectItem value="5">5+ bedrooms</SelectItem>
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bath className="w-5 h-5" />
                Bathrooms
              </CardTitle>
              <CardDescription>Number of full bathrooms</CardDescription>
            </CardHeader>
            <CardContent>
              <Select value={formData.bathrooms.toString()} onValueChange={(value) => updateField("bathrooms", parseInt(value))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 bathroom</SelectItem>
                  <SelectItem value="2">2 bathrooms</SelectItem>
                  <SelectItem value="3">3 bathrooms</SelectItem>
                  <SelectItem value="4">4+ bathrooms</SelectItem>
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Half Bath</CardTitle>
              <CardDescription>Additional powder room?</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="flex items-center space-x-2">
                <Switch
                  id="half-bath"
                  checked={formData.hasBathroomHalf}
                  onCheckedChange={(checked) => updateField("hasBathroomHalf", checked)}
                />
                <Label htmlFor="half-bath">Has half bathroom</Label>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Living Room */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Home className="w-5 h-5" />
              Living Room
            </CardTitle>
            <CardDescription>Information about the main living space</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Switch
                  id="living-room"
                  checked={formData.hasLivingRoom}
                  onCheckedChange={(checked) => updateField("hasLivingRoom", checked)}
                />
                <Label htmlFor="living-room">Has dedicated living room</Label>
              </div>
              
              {formData.hasLivingRoom && (
                <div>
                  <Label htmlFor="seating">Seating Capacity</Label>
                  <Input
                    id="seating"
                    type="number"
                    placeholder="e.g., 4"
                    value={formData.livingRoomSeating || ""}
                    onChange={(e) => updateField("livingRoomSeating", e.target.value ? parseInt(e.target.value) : undefined)}
                    className="mt-2 max-w-32"
                  />
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Kitchen */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ChefHat className="w-5 h-5" />
              Kitchen
            </CardTitle>
            <CardDescription>What type of kitchen access do guests have?</CardDescription>
          </CardHeader>
          <CardContent>
            <Select value={formData.kitchenType} onValueChange={(value) => updateField("kitchenType", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select kitchen type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="full-private">Full Private Kitchen</SelectItem>
                <SelectItem value="shared">Shared Kitchen</SelectItem>
                <SelectItem value="kitchenette">Kitchenette</SelectItem>
                <SelectItem value="none">No Kitchen Access</SelectItem>
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        {/* Balcony & Outdoor */}
        <Card>
          <CardHeader>
            <CardTitle>Balcony & Outdoor Areas</CardTitle>
            <CardDescription>Any outdoor space available to guests?</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Switch
                  id="balcony"
                  checked={formData.hasBalcony}
                  onCheckedChange={(checked) => updateField("hasBalcony", checked)}
                />
                <Label htmlFor="balcony">Has balcony or outdoor space</Label>
              </div>
              
              {formData.hasBalcony && (
                <div>
                  <Label htmlFor="balcony-desc">Balcony Description</Label>
                  <Textarea
                    id="balcony-desc"
                    placeholder="e.g., Private balcony with city view, outdoor seating for 2"
                    value={formData.balconyDescription}
                    onChange={(e) => updateField("balconyDescription", e.target.value)}
                    className="mt-2"
                    rows={2}
                  />
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Size & Floor */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Total Size</CardTitle>
              <CardDescription>Overall size of the space</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2">
                <Input
                  type="number"
                  placeholder="e.g., 800"
                  value={formData.totalSize || ""}
                  onChange={(e) => updateField("totalSize", e.target.value ? parseInt(e.target.value) : undefined)}
                />
                <Select value={formData.sizeUnit} onValueChange={(value) => updateField("sizeUnit", value)}>
                  <SelectTrigger className="w-24">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sqft">sq ft</SelectItem>
                    <SelectItem value="m²">m²</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Floor & Access</CardTitle>
              <CardDescription>Which floor and elevator access</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="floor">Floor Number</Label>
                  <Input
                    id="floor"
                    type="number"
                    placeholder="e.g., 5"
                    value={formData.floorNumber || ""}
                    onChange={(e) => updateField("floorNumber", e.target.value ? parseInt(e.target.value) : undefined)}
                    className="mt-2"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="elevator"
                    checked={formData.hasElevator}
                    onCheckedChange={(checked) => updateField("hasElevator", checked)}
                  />
                  <Label htmlFor="elevator">Elevator access</Label>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}