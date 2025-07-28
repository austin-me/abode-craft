import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { DollarSign, TrendingUp, Calendar, Info } from "lucide-react";
import { ListingFormData } from "../ListingForm";

interface PricingFeesProps {
  data: Partial<ListingFormData>;
  onUpdate: (data: Partial<ListingFormData>) => void;
}

export function PricingFees({ data, onUpdate }: PricingFeesProps) {
  const [formData, setFormData] = useState({
    basePrice: data.basePrice || 0,
    currency: data.currency || "USD",
    cleaningFee: data.cleaningFee || undefined,
    securityDeposit: data.securityDeposit || undefined,
  });

  const [smartPricingEnabled, setSmartPricingEnabled] = useState(false);

  useEffect(() => {
    onUpdate(formData);
  }, [formData, onUpdate]);

  const updateField = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const currencies = [
    { code: "USD", name: "US Dollar", symbol: "$" },
    { code: "EUR", name: "Euro", symbol: "€" },
    { code: "GBP", name: "British Pound", symbol: "£" },
    { code: "CAD", name: "Canadian Dollar", symbol: "C$" },
    { code: "AUD", name: "Australian Dollar", symbol: "A$" },
    { code: "JPY", name: "Japanese Yen", symbol: "¥" },
    { code: "CHF", name: "Swiss Franc", symbol: "CHF" },
    { code: "CNY", name: "Chinese Yuan", symbol: "¥" },
  ];

  const selectedCurrency = currencies.find(c => c.code === formData.currency);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="text-center mb-8">
        <DollarSign className="w-12 h-12 text-primary mx-auto mb-4" />
        <h2 className="text-3xl font-bold mb-2">Pricing & Fees</h2>
        <p className="text-muted-foreground">Set competitive rates and any additional fees for your property</p>
      </div>

      <div className="grid gap-6">
        {/* Base Price */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="w-5 h-5" />
              Base Nightly Rate
            </CardTitle>
            <CardDescription>
              Your standard nightly rate before any discounts or additional fees
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="base-price">Nightly Price</Label>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-lg font-medium">
                    {selectedCurrency?.symbol}
                  </span>
                  <Input
                    id="base-price"
                    type="number"
                    placeholder="0"
                    value={formData.basePrice || ""}
                    onChange={(e) => updateField("basePrice", e.target.value ? parseFloat(e.target.value) : 0)}
                    min="0"
                    step="1"
                    className="flex-1"
                  />
                  <span className="text-sm text-muted-foreground">per night</span>
                </div>
              </div>
              
              <div>
                <Label htmlFor="currency">Currency</Label>
                <Select value={formData.currency} onValueChange={(value) => updateField("currency", value)}>
                  <SelectTrigger className="mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {currencies.map((currency) => (
                      <SelectItem key={currency.code} value={currency.code}>
                        {currency.symbol} {currency.name} ({currency.code})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Smart Pricing */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Smart Pricing (Coming Soon)
            </CardTitle>
            <CardDescription>
              Automatically adjust your rates based on demand, seasonality, and local events
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
              <div className="flex items-center space-x-2">
                <Switch
                  id="smart-pricing"
                  checked={smartPricingEnabled}
                  onCheckedChange={setSmartPricingEnabled}
                  disabled
                />
                <Label htmlFor="smart-pricing" className="text-muted-foreground">
                  Enable Smart Pricing
                </Label>
              </div>
              <div className="text-xs text-muted-foreground">
                Feature coming soon
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Additional Fees */}
        <Card>
          <CardHeader>
            <CardTitle>Additional Fees</CardTitle>
            <CardDescription>
              Optional fees that help cover costs and protect your property
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6">
              {/* Cleaning Fee */}
              <div>
                <Label htmlFor="cleaning-fee">Cleaning Fee (Optional)</Label>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-lg font-medium">
                    {selectedCurrency?.symbol}
                  </span>
                  <Input
                    id="cleaning-fee"
                    type="number"
                    placeholder="0"
                    value={formData.cleaningFee || ""}
                    onChange={(e) => updateField("cleaningFee", e.target.value ? parseFloat(e.target.value) : undefined)}
                    min="0"
                    step="1"
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  One-time fee charged to cover professional cleaning between guests
                </p>
              </div>

              {/* Security Deposit */}
              <div>
                <Label htmlFor="security-deposit">Security Deposit (Optional)</Label>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-lg font-medium">
                    {selectedCurrency?.symbol}
                  </span>
                  <Input
                    id="security-deposit"
                    type="number"
                    placeholder="0"
                    value={formData.securityDeposit || ""}
                    onChange={(e) => updateField("securityDeposit", e.target.value ? parseFloat(e.target.value) : undefined)}
                    min="0"
                    step="1"
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Refundable deposit to protect against damages (held, not charged)
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Pricing Preview */}
        {formData.basePrice > 0 && (
          <Card className="border-primary/20 bg-primary/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-primary">
                <Info className="w-5 h-5" />
                Pricing Preview
              </CardTitle>
              <CardDescription>
                How your pricing will appear to guests (example for 3 nights)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>{selectedCurrency?.symbol}{formData.basePrice} × 3 nights</span>
                  <span>{selectedCurrency?.symbol}{(formData.basePrice * 3).toFixed(2)}</span>
                </div>
                
                {formData.cleaningFee && (
                  <div className="flex justify-between">
                    <span>Cleaning fee</span>
                    <span>{selectedCurrency?.symbol}{formData.cleaningFee.toFixed(2)}</span>
                  </div>
                )}
                
                <div className="border-t border-border pt-3">
                  <div className="flex justify-between font-semibold">
                    <span>Total before taxes</span>
                    <span>
                      {selectedCurrency?.symbol}
                      {(
                        formData.basePrice * 3 + 
                        (formData.cleaningFee || 0)
                      ).toFixed(2)}
                    </span>
                  </div>
                </div>
                
                {formData.securityDeposit && (
                  <div className="text-xs text-muted-foreground pt-2 border-t border-border">
                    Security deposit: {selectedCurrency?.symbol}{formData.securityDeposit.toFixed(2)} (refundable)
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Seasonal Pricing Placeholder */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Seasonal Pricing (Coming Soon)
            </CardTitle>
            <CardDescription>
              Set different rates for peak seasons, holidays, and special events
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-32 bg-muted/50 rounded-lg flex items-center justify-center border-2 border-dashed border-border">
              <div className="text-center text-muted-foreground">
                <Calendar className="w-8 h-8 mx-auto mb-2 opacity-50" />
                <p>Calendar-based pricing coming soon</p>
                <p className="text-sm">Set custom rates for specific dates</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}