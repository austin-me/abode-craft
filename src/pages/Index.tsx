import { useState } from "react";
import { WelcomeScreen } from "@/components/WelcomeScreen";
import { ListingForm, ListingFormData } from "@/components/ListingForm";

const Index = () => {
  const [currentView, setCurrentView] = useState<'welcome' | 'form' | 'success'>('welcome');
  const [hasDraft, setHasDraft] = useState(false); // In a real app, this would check localStorage or backend

  const handleStartNew = () => {
    setCurrentView('form');
  };

  const handleResumeDraft = () => {
    setCurrentView('form');
    // In a real app, load draft data from storage
  };

  const handleBack = () => {
    setCurrentView('welcome');
  };

  const handleSubmit = (data: ListingFormData) => {
    console.log('Listing submitted:', data);
    // In a real app, this would submit to a backend
    setCurrentView('success');
  };

  if (currentView === 'welcome') {
    return (
      <WelcomeScreen
        onStartNew={handleStartNew}
        onResumeDraft={handleResumeDraft}
        hasDraft={hasDraft}
      />
    );
  }

  if (currentView === 'form') {
    return (
      <ListingForm
        onBack={handleBack}
        onSubmit={handleSubmit}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-subtle flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Listing Submitted!</h1>
        <p className="text-xl text-muted-foreground mb-8">Your apartment listing has been submitted for review.</p>
        <button 
          onClick={() => setCurrentView('welcome')}
          className="text-primary hover:underline"
        >
          Create Another Listing
        </button>
      </div>
    </div>
  );
};

export default Index;
