import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface Step {
  id: string;
  title: string;
  description: string;
}

interface ProgressIndicatorProps {
  steps: Step[];
  currentStep: string;
  completedSteps: string[];
}

export function ProgressIndicator({ steps, currentStep, completedSteps }: ProgressIndicatorProps) {
  const currentIndex = steps.findIndex(step => step.id === currentStep);
  
  return (
    <div className="w-full bg-card border-b border-border sticky top-0 z-20 shadow-soft">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between max-w-6xl mx-auto">
          {steps.map((step, index) => {
            const isCompleted = completedSteps.includes(step.id);
            const isCurrent = step.id === currentStep;
            const isUpcoming = index > currentIndex;
            
            return (
              <div key={step.id} className="flex items-center">
                {/* Step Circle */}
                <div className="flex flex-col items-center">
                  <div className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center border-2 transition-smooth",
                    {
                      "bg-success text-success-foreground border-success": isCompleted,
                      "bg-primary text-primary-foreground border-primary": isCurrent,
                      "bg-muted text-muted-foreground border-muted": isUpcoming,
                    }
                  )}>
                    {isCompleted ? (
                      <Check className="w-5 h-5" />
                    ) : (
                      <span className="text-sm font-medium">{index + 1}</span>
                    )}
                  </div>
                  
                  {/* Step Info */}
                  <div className="mt-2 text-center hidden sm:block">
                    <p className={cn(
                      "text-xs font-medium transition-smooth",
                      {
                        "text-success": isCompleted,
                        "text-primary": isCurrent,
                        "text-muted-foreground": isUpcoming,
                      }
                    )}>
                      {step.title}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1 max-w-20">
                      {step.description}
                    </p>
                  </div>
                </div>
                
                {/* Connector Line */}
                {index < steps.length - 1 && (
                  <div className={cn(
                    "h-0.5 w-16 mx-4 transition-smooth",
                    {
                      "bg-success": index < currentIndex || isCompleted,
                      "bg-muted": index >= currentIndex,
                    }
                  )} />
                )}
              </div>
            );
          })}
        </div>
        
        {/* Progress Bar */}
        <div className="mt-4 bg-muted rounded-full h-1 max-w-6xl mx-auto">
          <div 
            className="bg-gradient-primary h-1 rounded-full transition-smooth duration-300"
            style={{ 
              width: `${((currentIndex + 1) / steps.length) * 100}%` 
            }}
          />
        </div>
      </div>
    </div>
  );
}