import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Building2, Home, Calendar } from "lucide-react";
import { ListingFormData } from "../ListingForm";

interface ApartmentBasicsProps {
  data: Partial<ListingFormData>;
  onUpdate: (data: Partial<ListingFormData>) => void;
}

export function ApartmentBasics({ data, onUpdate }: ApartmentBasicsProps) {
  const [formData, setFormData] = useState({
    title: data.title || "",
    apartmentType: data.apartmentType || "",
    buildingType: data.buildingType || "",
    listingCategory: data.listingCategory || "",
    occupancyType: data.occupancyType || "",
    yearBuilt: data.yearBuilt || undefined,
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
        <Building2 className="w-12 h-12 text-primary mx-auto mb-4" />
        <h2 className="text-3xl font-bold mb-2">Apartment Basics</h2>
        <p className="text-muted-foreground">Tell us about your property's fundamental details</p>
      </div>

      <div className="grid gap-6">
        {/* Apartment Title */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Home className="w-5 h-5" />
              Property Title
            </CardTitle>
            <CardDescription>
              Give your apartment a descriptive name that guests will see first
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Label htmlFor="title">Apartment Title</Label>
            <Input
              id="title"
              placeholder="e.g., Modern Downtown Apartment with City View"
              value={formData.title}
              onChange={(e) => updateField("title", e.target.value)}
              className="mt-2"
            />
          </CardContent>
        </Card>

        {/* Property Types */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Apartment Type</CardTitle>
              <CardDescription>What type of apartment is this?</CardDescription>
            </CardHeader>
            <CardContent>
              <Select value={formData.apartmentType} onValueChange={(value) => updateField("apartmentType", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select apartment type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="studio">Studio</SelectItem>
                  <SelectItem value="1br">1 Bedroom</SelectItem>
                  <SelectItem value="2br">2 Bedroom</SelectItem>
                  <SelectItem value="3br">3 Bedroom</SelectItem>
                  <SelectItem value="4br">4+ Bedroom</SelectItem>
                  <SelectItem value="loft">Loft</SelectItem>
                  <SelectItem value="penthouse">Penthouse</SelectItem>
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Building Type</CardTitle>
              <CardDescription>What type of building is it in?</CardDescription>
            </CardHeader>
            <CardContent>
              <Select value={formData.buildingType} onValueChange={(value) => updateField("buildingType", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select building type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="highrise">High-rise</SelectItem>
                  <SelectItem value="lowrise">Low-rise</SelectItem>
                  <SelectItem value="serviced">Serviced Apartment</SelectItem>
                  <SelectItem value="house">House</SelectItem>
                  <SelectItem value="townhouse">Townhouse</SelectItem>
                  <SelectItem value="condo">Condominium</SelectItem>
                </SelectContent>
              </Select>
            </CardContent>
          </Card>
        </div>

        {/* Listing Category & Occupancy */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Listing Category</CardTitle>
              <CardDescription>How long do guests typically stay?</CardDescription>
            </CardHeader>
            <CardContent>
              <Select value={formData.listingCategory} onValueChange={(value) => updateField("listingCategory", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="short-term">Short-Term (1-30 days)</SelectItem>
                  <SelectItem value="long-term">Long-Term (30+ days)</SelectItem>
                  <SelectItem value="monthly">Monthly Rental</SelectItem>
                  <SelectItem value="vacation">Vacation Rental</SelectItem>
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Occupancy Type</CardTitle>
              <CardDescription>What will guests have access to?</CardDescription>
            </CardHeader>
            <CardContent>
              <Select value={formData.occupancyType} onValueChange={(value) => updateField("occupancyType", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select occupancy" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="entire">Entire Place</SelectItem>
                  <SelectItem value="private-room">Private Room</SelectItem>
                  <SelectItem value="shared">Shared Room</SelectItem>
                </SelectContent>
              </Select>
            </CardContent>
          </Card>
        </div>

        {/* Year Built */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Year Built (Optional)
            </CardTitle>
            <CardDescription>
              When was this building constructed? This helps guests understand the property's age and style.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Input
              type="number"
              placeholder="e.g., 2010"
              value={formData.yearBuilt || ""}
              onChange={(e) => updateField("yearBuilt", e.target.value ? parseInt(e.target.value) : undefined)}
              min="1900"
              max={new Date().getFullYear()}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}